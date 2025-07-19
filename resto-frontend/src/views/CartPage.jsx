import React, { useState, useEffect , useRef, useContext} from 'react';
// IconChevronDown n'est plus nécessaire car DaisyUI gère l'icône
import { IconChevronRight, IconCarrot, IconTrash, IconMinus, IconPlus, IconShoppingCartX, IconMoodEmptyFilled, IconChevronLeft, IconCheck, IconX, IconTable, IconShovelPitchforks, IconDoor, IconNote } from '@tabler/icons-react';
import { createOrderFromQrMenu, getCart, setCart } from '../controllers/qrmenu.controller';
import { getImageURL } from '../helpers/ImageHelper';
import { iconStroke } from '../config/config';
import { useLocation, useParams , useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { validatePhone } from '../utils/phoneValidator';
import { SocketContext } from '../contexts/SocketContext';
import { initSocket } from '../utils/socket';
import { useTranslation } from 'react-i18next';
import {useTheme} from '../contexts/ThemeContext';

const CartPage = () => {
  const { t } = useTranslation();
  const { socket, isSocketConnected } = useContext(SocketContext);

  const [state, setState] = useState({ cartItems: [], itemsTotal: 0, taxTotal: 0, serviceChargeTotal: 0, payableTotal: 0 });
  const [showPhoneFields, setShowPhoneFields] = useState(false);
  const [selectedCustomerType, setSelectedCustomerType] = useState(null);
  const params = useParams();
  const qrcode = params.qrcode;
  const navigate = useNavigate();

  const location = useLocation();
  const { storeTable , currency , serviceCharge } = location.state || null;

  const nameRef = useRef(null);
  const phoneRef = useRef(null);

  // dialog: notes ref
  const dialogNotesIndexRef = useRef();
  const dialogNotesTextRef = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Pour gérer l'ouverture/fermeture des détails d'un item sur mobile
  // Nous n'avons plus besoin de openItemIndex pour chaque élément individuel
  // car DaisyUI gérera l'état via le checkbox.
  // Cependant, nous pouvons l'utiliser si nous voulons forcer l'ouverture du premier item.
  const [openInitialItem, setOpenInitialItem] = useState(true); // Pour contrôler l'ouverture initiale du premier item

  useEffect(() => {
    const storedCart = getCart() || [];
    const { itemsTotal, taxTotal, serviceChargeTotal, payableTotal } = calculateOrderSummary(storedCart);
    setState((prevState) => ({
      ...prevState,
      itemsTotal,
      taxTotal,
      serviceChargeTotal,
      payableTotal,
      cartItems: storedCart
    }));

    // Si nous voulons que le premier élément du panier soit ouvert par défaut,
    // nous pouvons laisser cet état. Sinon, on peut le retirer.
    // Pour l'exemple, je le laisse pour le premier élément.
    if (storedCart.length > 0) {
      setOpenInitialItem(true);
    } else {
      setOpenInitialItem(false);
    }

  }, []);

  const { cartItems, itemsTotal, taxTotal, serviceChargeTotal, payableTotal } = state;

  const sendNewOrderEvent = () => {
    if (isSocketConnected) {
      socket.emit('new_qrorder_backend', {}, qrcode);
    } else {
      // Handle disconnected state (optional)
      initSocket();
      socket.emit('new_qrorder_backend', {}, qrcode);
    }
  }

  function removeItemFromCart(index) {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCart(newCartItems);
    updateCart(newCartItems);
  }

  function addCartItemQuantity(index, currentQuantity) {
    const newQuantity = currentQuantity + 1;
    const newCartItems = [...cartItems];
    newCartItems[index].quantity = newQuantity;
    setCart(newCartItems);
    updateCart(newCartItems);
  }

  function minusCartItemQuantity(index, currentQuantity) {
    const newQuantity = currentQuantity - 1;
    let newCartItems = [...cartItems];
    newCartItems[index].quantity = newQuantity;

    if (newQuantity === 0) {
      newCartItems = newCartItems.filter((_, i) => i !== index);
    }

    setCart(newCartItems);
    updateCart(newCartItems);
  }

  const updateCart = (items) => {
    const { itemsTotal, taxTotal, payableTotal } = calculateOrderSummary(items);
    setState({ ...state, cartItems: items, itemsTotal, taxTotal, payableTotal });
  };

  const calculateOrderSummary = (items) => {
    let itemsTotal = 0;
    let taxTotal = 0;
    let serviceChargeTotal = 0;
    let payableTotal = 0;

    items.forEach((item) => {
      const taxRate = Number(item.tax_rate);
      const taxType = item.tax_type;
      const itemPrice = Number(item.price) * Number(item.quantity);

      if (taxType === 'exclusive') {
        const tax = (itemPrice * taxRate) / 100;
        taxTotal += tax;
        itemsTotal += itemPrice;
        payableTotal += itemPrice + tax;
      } else if (taxType === 'inclusive') {
        const tax = itemPrice - (itemPrice * (100 / (100 + taxRate)));
        taxTotal += tax;
        itemsTotal += itemPrice - tax;
        payableTotal += itemPrice;
      } else {
        itemsTotal += itemPrice;
        payableTotal += itemPrice;
      }
    });

     // Calculate Total Service charge % from items total
     if (serviceCharge) {
      let calculatedServiceCharge = (Number(itemsTotal) * Number(serviceCharge)) / 100;
      serviceChargeTotal += calculatedServiceCharge;
      payableTotal += calculatedServiceCharge;
    }

    return { itemsTotal, taxTotal, serviceChargeTotal, payableTotal };
  };

    const btnPlaceOrder = async () => {

      if (showPhoneFields) {
        const phone = phoneRef.current?.value || "";
        const name = nameRef.current?.value || "";

        if (!name.trim()) {
          toast.error(t('cart.name_required'));
          return;
        }

        if (!validatePhone(phone)) {
          toast.error(t('cart.valid_phone_error'));
          return;
        }
      }

    try {
      const deliveryType = null;
      const tableId = storeTable?.id || null;
      const customerType = showPhoneFields ? "CUSTOMER" : "WALKIN";
      const customer = showPhoneFields
        ? {
            name: nameRef.current?.value || "",
            phone: phoneRef.current?.value || "",
          }
        : { name: "Guest", phone: "" };

      toast.loading(t('cart.please_wait'));

      const res = await createOrderFromQrMenu(deliveryType , cartItems, customerType, customer, tableId , qrcode);
      toast.dismiss();
      if(res.status == 200) {
        const data = res.data;
        toast.success(t('cart.order_success'));
        document.getElementById("modal-place-order").close();


        setState({
          ...state,
          cartItems: [],
        })

        setCart([]);

        setSelectedCustomerType(null);
        sendNewOrderEvent();

        navigate('/m/order-success');
      }
    } catch (error) {
      const message = error?.response?.data?.message || t('cart.something_went_wrong');
      console.error(error);

      toast.dismiss();
      toast.error(message);
      navigate('/m/order-failed');
    }
  };

    // order notes
    const btnOpenNotesModal = (index, notes) => {
      dialogNotesIndexRef.current.value = index;
      dialogNotesTextRef.current.value = notes;
      document.getElementById('modal-notes').showModal()
    }
    const btnAddNotes = () => {
      const index = dialogNotesIndexRef.current.value;
      const notes = dialogNotesTextRef.current.value || null;

      const newCartItems = cartItems;
      newCartItems[index].notes = notes;

      setState({
        ...state,
        cartItems: newCartItems
      })
    };

  return (
    <div className='min-h-screen bg-white dark:bg-black'>
      <div className='container w-full max-w-5xl mx-auto flex flex-col items-center px-2 md:px-0'>
        {/* Header sticky moderne */}
        <div className="sticky top-0 z-40 w-full bg-white/80 dark:bg-black/80 backdrop-blur border-b border-restro-border-green rounded-b-3xl shadow-md mb-4">
          <div className="relative flex items-center justify-center py-6">
            <button className="absolute left-4 p-2 bg-gray-100 dark:bg-restro-bg-gray rounded-full hover:bg-gray-200 dark:hover:bg-restro-button-hover transition" onClick={() => window.history.back()}>
              <IconChevronLeft size={24} stroke={2} />
            </button>
            <h3 className="text-xl md:text-2xl font-bold text-center w-full">{t('cart.title')}</h3>
          </div>
        </div>

        {/* Bloc table/info */}
        {storeTable && (
          <div className="flex items-center gap-3 mt-2 mb-4 p-3 justify-center bg-white dark:bg-restro-card-bg rounded-2xl shadow border border-restro-border-green w-full max-w-md mx-auto">
            <IconShovelPitchforks size={22} stroke={2} className="text-restro-green" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{storeTable.table_title}</h3>
            {storeTable.floor && (
              <span className="text-md text-gray-600 dark:text-gray-300">( {storeTable.floor} )</span>
            )}
          </div>
        )}

        {/* Cart Items - améliorations responsivité avec collapse DaisyUI */}
        <div className="w-full max-w-5xl mx-auto mt-2">
          {cartItems.length > 0 ? (
            <div className="space-y-4">
              {cartItems.map((item, i) => {
                const { id, title, price, quantity, image, notes } = item;
                const imageURL = getImageURL(image);
                return (
                  <div key={i} className="w-full">
                    {/* Mobile: version compacte et déroulante avec collapse DaisyUI */}
                    <div
                      className="sm:hidden collapse collapse-arrow bg-white dark:bg-restro-card-bg rounded-2xl shadow border border-restro-border-green"
                    >
                      {/* Input checkbox pour contrôler le collapse */}
                      {/* Le premier item sera defaultChecked, les autres non */}
                      <input type="checkbox" className="peer" defaultChecked={i === 0 && openInitialItem} />

                      {/* En-tête de l'item (collapse-title) */}
                      <div className="collapse-title flex items-center gap-3 p-3 min-h-0"> {/* min-h-0 pour réduire la hauteur par défaut de collapse-title */}
                        <div className="w-16 h-16 bg-gray-200 dark:bg-restro-bg-gray rounded-xl overflow-hidden flex items-center justify-center text-gray-500 flex-shrink-0">
                          {image ? (
                            <img src={imageURL} alt={title} className="object-cover w-full h-full" />
                          ) : (
                            <IconCarrot size={32} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col gap-1">
                          <p className="text-sm font-semibold line-clamp-2 text-ellipsis text-gray-800 dark:text-white">{title}</p>
                          <p className="text-restro-green font-bold text-base">{currency}{(price * quantity).toFixed(2)}</p>
                        </div>
                        {/* L'icône de chevron est gérée automatiquement par collapse-arrow */}
                      </div>

                      {/* Contenu déroulant (collapse-content) */}
                      <div className="collapse-content px-3 pb-3">
                        <div className="flex flex-col gap-3 pt-2 border-t border-restro-border-green">
                          {/* Variantes et Addons */}
                          <div className="text-xs text-gray-400 flex flex-wrap gap-2">
                            {item?.variant?.title && <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-lg">{item.variant.title}</span>}
                            {item.addons?.length > 0 && <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-lg">{item.addons.length}  {t('cart.addons')}</span>}
                          </div>
                          {item.addons?.length > 0 && (
                            <div className="text-xs text-gray-500 flex flex-wrap gap-1">
                              {item.addons.map((addon, idx) => (
                                <span key={idx} className="inline-block bg-gray-50 dark:bg-restro-bg-gray border border-gray-200 dark:border-restro-border-green rounded px-2 py-1">{addon.title}</span>
                              ))}
                            </div>
                          )}
                          {/* Notes */}
                          {notes && (
                            <div className="text-xs italic text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-restro-bg-gray border border-gray-200 dark:border-restro-border-green rounded-lg px-3 py-2 w-fit">
                              {t('cart.notes')}: {notes}
                            </div>
                          )}

                          {/* Contrôles (quantité, notes, supprimer) */}
                          <div className="flex items-center justify-between gap-2 mt-2">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => minusCartItemQuantity(i, quantity)}
                                className="btn btn-square btn-xs rounded-lg bg-gray-100 dark:bg-restro-bg-gray hover:bg-gray-200 dark:hover:bg-restro-button-hover"
                              >
                                <IconMinus stroke={iconStroke} size={14}/>
                              </button>
                              <div className="text-center text-base w-8 rounded-lg font-bold">{quantity}</div>
                              <button
                                onClick={() => addCartItemQuantity(i, quantity)}
                                className="btn btn-square btn-xs rounded-lg bg-gray-100 dark:bg-restro-bg-gray hover:bg-gray-200 dark:hover:bg-restro-button-hover"
                              >
                                <IconPlus stroke={iconStroke} size={14} />
                              </button>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {btnOpenNotesModal(i, notes)}}
                                className="text-xs transition active:scale-95 hover:shadow-lg px-2 py-1 flex items-center gap-1 rounded-xl border border-restro-border-green bg-restro-card-bg hover:bg-restro-button-hover text-restro-text"
                              >
                                <IconNote size={16} stroke={iconStroke} />
                                <span>{t('cart.add_notes')}</span>
                              </button>
                              <button
                                onClick={() => removeItemFromCart(i)}
                                className="text-restro-red hover:text-red-700 transition w-6 h-6 flex items-center justify-center"
                              >
                                <IconTrash stroke={iconStroke} className='w-full h-full'/>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Desktop: carte large, disposition horizontale (aucune modification ici) */}
                    <div className="hidden sm:flex flex-row items-center bg-white dark:bg-restro-card-bg rounded-2xl shadow p-6 gap-6 border border-restro-border-green mb-4 max-w-5xl mx-auto w-full">
                      {/* Image à gauche */}
                      <div className="w-32 h-32 bg-gray-200 dark:bg-restro-bg-gray rounded-xl overflow-hidden flex items-center justify-center text-gray-500 flex-shrink-0">
                        {image ? (
                          <img src={imageURL} alt={title} className="object-cover w-full h-full" />
                        ) : (
                          <IconCarrot size={48} />
                        )}
                      </div>
                      {/* Colonne centrale */}
                      <div className="flex-1 min-w-0 flex flex-col gap-2">
                        <p className="text-lg lg:text-2xl font-semibold text-gray-800 dark:text-white">{title}</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {item?.variant?.title && <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-lg text-base">{item.variant.title}</span>}
                          {item.addons?.length > 0 && <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-3 py-1 rounded-lg text-base">{item.addons.length}  {t('cart.addons')}</span>}
                        </div>
                        {item.addons?.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.addons.map((addon, idx) => (
                              <span key={idx} className="inline-block bg-gray-50 dark:bg-restro-bg-gray border border-gray-200 dark:border-restro-border-green rounded px-2 py-1 text-sm text-gray-700 dark:text-gray-200">{addon.title}</span>
                            ))}
                          </div>
                        )}
                        {notes && (
                          <div className="text-sm italic text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-restro-bg-gray border border-gray-200 dark:border-restro-border-green rounded-lg px-4 py-2 mt-2 max-w-lg w-fit">
                            {t('cart.notes')}: {notes}
                          </div>
                        )}
                      </div>
                      {/* Colonne droite */}
                      <div className="flex flex-col items-end justify-between h-full gap-4 min-w-[140px]">
                        <div className="flex flex-row items-center gap-2">
                          <button
                            onClick={() => minusCartItemQuantity(i, quantity)}
                            className="btn btn-square btn-sm rounded-lg bg-gray-100 dark:bg-restro-bg-gray hover:bg-gray-200 dark:hover:bg-restro-button-hover"
                          >
                            <IconMinus stroke={iconStroke} size={18}/>
                          </button>
                          <div className="text-center text-lg w-10 rounded-lg font-bold">{quantity}</div>
                          <button
                            onClick={() => addCartItemQuantity(i, quantity)}
                            className="btn btn-square btn-sm rounded-lg bg-gray-100 dark:bg-restro-bg-gray hover:bg-gray-200 dark:hover:bg-restro-button-hover"
                          >
                            <IconPlus stroke={iconStroke} size={18} />
                          </button>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                          <button
                            onClick={() => removeItemFromCart(i)}
                            className="text-restro-red hover:text-red-700 transition w-8 h-8 flex items-center justify-center"
                          >
                            <IconTrash stroke={iconStroke} className='w-full h-full'/>
                          </button>
                          <button
                            onClick={() => {btnOpenNotesModal(i, notes)}}
                            className="text-sm transition active:scale-95 hover:shadow-lg px-3 py-1 flex items-center gap-1 rounded-xl border border-restro-border-green bg-restro-card-bg hover:bg-restro-button-hover text-restro-text"
                          >
                            <IconNote size={18} stroke={iconStroke} />
                            <span className="hidden sm:inline">{t('cart.add_notes')}</span>
                          </button>
                        </div>
                        <span className="text-restro-green font-bold text-xl lg:text-2xl mt-2">{currency}{(price * quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-gray-500 flex flex-col justify-center items-center h-[60vh] gap-4">
              <IconShoppingCartX size={50} />
              <p className='text-xl'>{t('cart.empty_cart')}</p>
            </div>
          )}
        </div>

        {/* Résumé de commande moderne */}
        {cartItems.length > 0 && (
          <div className="w-full max-w-5xl mx-auto mt-8">
            <div className="bg-white dark:bg-restro-card-bg rounded-2xl shadow border border-restro-border-green">
              <div className="collapse collapse-arrow join-item">
                {/* Ajouter defaultChecked pour que le résumé soit ouvert par défaut */}
                <input type="checkbox" className="peer" defaultChecked />
                <div className="collapse-title text-lg md:text-xl font-bold flex justify-between">
                  <span>{t('cart.payable_total')}</span>
                  <span className='text-restro-green font-bold'>{currency}{payableTotal.toFixed(2)}</span>
                </div>
                <div className="collapse-content space-y-2 text-sm md:text-md">
                  <div className="flex justify-between">
                    <span>{t('cart.items_total')}</span>
                    <span>{currency}{itemsTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('cart.tax_total')}</span>
                    <span>{currency}{taxTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('cart.service_charge_total')}</span>
                    <span>{currency}{serviceChargeTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="h-32"/>

        {/* Checkout Section - VOTRE BOUTON STICKY ORIGINAL INTACT */}
        {cartItems.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black shadow-lg p-2 sm:p-4 flex justify-between items-center rounded-2xl mx-auto z-50 w-full max-w-full overflow-x-auto">
            <button
              onClick={() => {
                document.getElementById('modal-place-order').showModal();
              }}
              className="bg-restro-green text-white py-3 px-2 sm:px-6 rounded-xl flex flex-wrap justify-between w-full items-center gap-2 sm:gap-4 max-w-full overflow-hidden"
              style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}
            >
              <span className="flex items-center gap-2 sm:gap-3 min-w-0">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-restro-green font-bold text-lg shadow border-2 border-restro-green flex-shrink-0">
                  {cartItems.length}
                </span>
                <span className="text-md font-bold md:text-lg break-words whitespace-normal block min-w-0 max-w-full">
                  {t('cart.total')} {currency}{payableTotal.toFixed(2)}
                </span>
              </span>
              <span className="text-white text-lg md:text-xl font-bold px-2 rounded-lg flex items-center break-words whitespace-normal min-w-0 max-w-full">
                {t('cart.checkout')} <IconChevronRight size={20} stroke={3} />
              </span>
            </button>
          </div>
        )}

        {/* Modal place order modernisé */}
        <dialog id="modal-place-order" className="modal modal-bottom sm:modal-middle w-full mx-auto max-w-2xl">
          <div className='modal-box border border-restro-border-green dark:rounded-2xl bg-white dark:bg-restro-card-bg'>
            <div className="my-2 mx-auto w-full relative">
              <h3 className='text-center text-xl font-semibold'>{t('cart.continue_as')}</h3>
              <div className="absolute top-0 right-0 text-red-400 cursor-pointer">
                <button onClick={() => {document.getElementById('modal-place-order').close()}}>
                  <IconX size={20} />
                </button>
              </div>
              <div className="flex flex-col justify-around mt-4">
                <button
                  className={`rounded-lg transition px-4 py-3 text-lg font-semibold border-2 ${!showPhoneFields ? 'bg-white dark:bg-restro-card-bg border-restro-green text-restro-green shadow-sm' : 'bg-gray-100 dark:bg-restro-bg-gray text-gray-600 hover:bg-gray-200'}`}
                  onClick={() => setShowPhoneFields(false)}
                >
                  {t('cart.guest')}
                </button>
                <div className="relative flex items-center justify-center my-6">
                  <div className="border-t border-restro-border-green w-full"></div>
                  <span className="absolute bg-white dark:bg-restro-card-bg px-4 text-gray-500 text-sm">{t('cart.or')}</span>
                </div>
                <button
                  className={`rounded-lg transition px-4 py-3 text-lg font-semibold border-2 ${showPhoneFields ? 'bg-white dark:bg-restro-card-bg border-restro-green text-restro-green shadow-sm ' : 'bg-gray-100 dark:bg-restro-bg-gray text-restro-text hover:bg-gray-200 border-restro-border-green'}`}
                  onClick={() => setShowPhoneFields(true)}
                >
                  {t('cart.using_phone_number')}
                </button>
              </div>
              {showPhoneFields && (
                <div className="mt-6">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">{t('cart.name_label')} <span className="text-xs text-gray-400">- (Required)</span></label>
                    <input
                      type="text"
                      ref={nameRef}
                      className='text-sm w-full rounded-lg px-4 py-2 border border-restro-border-green dark:bg-restro-bg-gray focus:outline-restro-border-green'
                      placeholder={t('cart.name_placeholder')}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">{t('cart.phone_label')} <span className="text-xs text-gray-400">- (Required)</span></label>
                    <input
                      type="tel"
                      ref={phoneRef}
                      className='text-sm w-full rounded-lg px-4 py-2 border border-restro-border-green dark:bg-restro-bg-gray focus:outline-restro-border-green'
                      placeholder={t('cart.phone_placeholder')}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="modal-action justify-center w-full">
              <button
                onClick={() => {btnPlaceOrder()}}
                className="rounded-lg hover:bg-restro-green-dark transition active:scale-95 hover:shadow-lg px-4 py-4 bg-restro-green text-white w-full text-xl font-semibold"
              >
                {t('cart.place_order')}
              </button>
            </div>
          </div>
        </dialog>

        {/* dialog: notes */}
        <dialog id="modal-notes" className="modal modal-bottom sm:modal-middle">
          <div className='modal-box border border-restro-border-green dark:rounded-2xl bg-white dark:bg-restro-card-bg'>
            <h3 className="font-bold text-lg">{t('cart.add_notes')}</h3>
            <div className="my-4">
              <input type="hidden" ref={dialogNotesIndexRef} />
              <label htmlFor="dialogNotesText" className="mb-1 block text-gray-500 text-sm">{t('cart.notes')} <span className="text-xs text-gray-500">(100 character max.)</span></label>
              <input ref={dialogNotesTextRef} type="text" name="dialogNotesText" id='dialogNotesText' className='text-sm w-full rounded-lg px-4 py-2 border border-restro-border-green dark:bg-restro-bg-gray focus:outline-restro-border-green' placeholder={t('cart.notes_placeholder')} />
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="rounded-lg transition active:scale-95 hover:shadow-lg px-4 py-3 bg-restro-gray hover:bg-restro-button-hover text-restro-text">{t('cart.close')}</button>
                <button onClick={()=>{btnAddNotes();}} className="rounded-lg hover:bg-green-800 transition active:scale-95 hover:shadow-lg px-4 py-3 bg-restro-green text-white ml-3">{t('cart.save')}</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default CartPage;
