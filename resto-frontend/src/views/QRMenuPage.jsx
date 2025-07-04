import {
  IconCarrot,
  IconChevronRight,
  IconMail,
  IconMapPin,
  IconMenu,
  IconPhone,
  IconShare,
  IconX,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { iconStroke } from "../config/config";
import { getCart, setCart, getQRMenuInit } from "../controllers/qrmenu.controller";
import { CURRENCIES } from "../config/currencies.config";
import { getImageURL } from "../helpers/ImageHelper";
import toast from "react-hot-toast";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { getQRMenuLink } from "../helpers/QRMenuHelper";
import { useTranslation } from "react-i18next";
import LanguageChanger from "../components/LanguageChanger";
import { useTheme } from "../contexts/ThemeContext";

export default function QRMenuPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const qrcode = params.qrcode;
  const {theme} = useTheme();

  const [searchParams] = useSearchParams();
  const encryptedTableId = searchParams.get("table") ?? null;

  const [state, setState] = useState({
    isLoading: true,
    storeSettings: null,
    storeTable: null,
    serviceCharge: null,
    categories: [],
    currentCategory: "all",
    menuItems: [],
    searchQuery: "",
    currentItem: null,
    cartItems: [],
    currentItemId: null,
    currency: "",
  });

  useEffect(() => {
    _getQRMenu(qrcode);
  }, [qrcode]);

  const _getQRMenu = async (qrcode) => {
    try {
      const res = await getQRMenuInit(qrcode, encryptedTableId);

      const storedCart = getCart();
      if (res.status == 200) {
        const data = res.data;

        const currency = CURRENCIES.find(
          (c) => c.cc == data?.storeSettings?.currency
        );

        setState({
          ...state,
          isLoading: false,
          storeSettings: data?.storeSettings,
          categories: data?.categories,
          menuItems: data?.menuItems,
          storeTable: data?.storeTable || null,
          serviceCharge: data?.serviceCharge || null,
          cartItems: [...storedCart],
          currency: currency?.symbol || "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const {
    isLoading,
    storeSettings,
    categories,
    menuItems,
    currentCategory,
    searchQuery,
    currentItem,
    cartItems,
    currentItemId,
    currency,
    serviceCharge,
  } = state;

  const storeName = storeSettings?.store_name || "";
  const address = storeSettings?.address || "";
  const phone = storeSettings?.phone || "";
  const email = storeSettings?.email || "";
  const storeImage = storeSettings?.store_image || "";
  const is_qr_menu_enabled = storeSettings?.is_qr_menu_enabled || false;
  const is_qr_order_enabled = storeSettings?.is_qr_order_enabled || false;

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="container mx-auto px-4 flex h-screen items-center justify-center">
          {t("qr_menu.loading_message")}
        </div>
      </div>
    );
  }

  if (!qrcode) {
    return (
      <div className="w-full">
        <div className="container mx-auto px-4 flex h-screen items-center justify-center">
          {t("qr_menu.broken_link")}
        </div>
      </div>
    );
  }

  if (!is_qr_menu_enabled) {
    return (
      <div className="w-full">
        <div className="container mx-auto px-4 flex h-screen items-center justify-center">
          {t("qr_menu.menu_not_available")}
        </div>
      </div>
    );
  }

  const QR_MENU_LINK = getQRMenuLink(qrcode);

  const btnShare = async () => {
    const shareData = {
      title: t("qr_menu.menu"),
      text: t("qr_menu.menu"),
      url: QR_MENU_LINK,
    };

    try {
      if (navigator.canShare) {
        if (navigator?.canShare(shareData)) {
          await navigator.share(shareData);
        }
      } else {
        await navigator.clipboard.writeText(QR_MENU_LINK);
        toast.success(t("qr_menu.menu_link_copied"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const btnOpenMenuItemDetail = (
    addons,
    variants,
    category_id,
    category_title,
    id,
    image,
    price,
    tax_id,
    tax_rate,
    tax_title,
    tax_type,
    title
  ) => {
    setState({
      ...state,
      currentItem: {
        addons: addons,
        variants: variants,
        category_id: category_id,
        category_title: category_title,
        id,
        image,
        price,
        tax_id,
        tax_rate,
        tax_title,
        tax_type,
        title,
      },
    });
    document.getElementById("modal_item_detail").showModal();
  };

  // cart
  function addItemToCart(item) {
    const modifiedItem = {
      ...item,
      quantity: 1,
      notes: null,
    };

    const newCart = cartItems;

    newCart.push(modifiedItem);

    setState({
      ...state,
      cartItems: [...newCart],
    });
    setCart(newCart);
  }

  const btnAddMenuItemToCartWithVariantsAndAddon = () => {
    let price = 0;
    let selectedVariantId = null;
    const selectedAddonsId = [];

    const itemVariants = document.getElementsByName("variants");
    itemVariants.forEach((item) => {
      if (item.checked) {
        selectedVariantId = item.value;
        return;
      }
    });

    price = parseFloat(currentItem.price);

    const itemAddons = document.getElementsByName("addons");
    itemAddons.forEach((item) => {
      if (item.checked) {
        selectedAddonsId.push(item.value);
      }
    });

    const addons = currentItem?.addons || [];
    const variants = currentItem?.variants || [];

    let selectedVariant = null;
    if (selectedVariantId) {
      selectedVariant = variants.find((v) => v.id == selectedVariantId);
      price = parseFloat(selectedVariant.price);
    }

    let selectedAddons = [];
    if (selectedAddonsId.length > 0) {
      selectedAddons = selectedAddonsId.map((addonId) =>
        addons.find((addon) => addon.id == addonId)
      );
      selectedAddons.forEach((addon) => {
        const addonPrice = parseFloat(addon.price);
        price += addonPrice;
      });
    }

    const itemCart = {
      ...currentItem,
      price: price,
      variant_id: selectedVariantId,
      variant: selectedVariant,
      addons_ids: selectedAddonsId,
      addons: selectedAddons,
    };

    addItemToCart(itemCart);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="container mx-auto max-w-6xl">
        {/* Header moderne */}
        <div className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur border-b border-restro-border-green">
          <div className="px-4 py-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <input
                  type="search"
                  name="search"
                  id="search"
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-restro-bg-gray rounded-2xl outline-none border-2 border-transparent focus:border-restro-green transition-all duration-300 placeholder-gray-500 text-gray-800 dark:text-gray-200"
                  placeholder={t("qr_menu.search_placeholder")}
                  value={searchQuery}
                  onChange={(e) => {
                    setState({
                      ...state,
                      searchQuery: e.target.value,
                    });
                  }}
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <IconCarrot size={20} stroke={iconStroke} />
                </span>
              </div>
              <button
                className="bg-restro-green text-white p-3 rounded-2xl hover:shadow-lg active:scale-95 transition-all duration-300"
                onClick={() => document.getElementById("modal_store_details").showModal()}
              >
                <IconMenu stroke={iconStroke} size={20}/>
              </button>
            </div>
          </div>
        </div>

        {/* Carte restaurant moderne */}
        <div className="px-4 py-8">
          <div className="bg-white dark:bg-restro-card-bg rounded-3xl p-8 shadow-2xl border border-restro-border-green">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="relative">
                  {storeImage ? (
                    <img
                      src={getImageURL(storeImage)}
                      className="w-28 h-28 md:w-36 md:h-36 rounded-3xl shadow-2xl object-cover border-4 border-restro-green/20"
                      alt={`${storeName} Logo`}
                    />
                  ) : (
                    <div className="w-28 h-28 md:w-36 md:h-36 rounded-3xl bg-restro-green flex items-center justify-center shadow-2xl">
                      <IconCarrot className="text-white" size={48} />
                    </div>
                  )}
                  {/* Badge Premium rond en bas à droite */}
                  <div className="absolute -bottom-2 -right-2 bg-restro-green flex items-center justify-center w-8 h-8 rounded-full shadow-lg border-2 border-white dark:border-restro-card-bg">
                    <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='white' viewBox='0 0 20 20'><path d='M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z'/></svg>
                  </div>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
                  {storeName}
                </h1>
                <div className="space-y-3 mt-6">
                  {address && (
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 justify-center md:justify-start">
                      <div className="bg-gray-100 dark:bg-restro-bg-gray p-2 rounded-xl">
                        <IconMapPin stroke={iconStroke} size={18} />
                      </div>
                      <p className="text-sm md:text-base font-medium">{address}</p>
                    </div>
                  )}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    {phone && (
                      <a
                        href={`tel:${phone}`}
                        className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-restro-green transition-colors"
                      >
                        <div className="bg-gray-100 dark:bg-restro-bg-gray p-2 rounded-xl">
                          <IconPhone stroke={iconStroke} size={18} />
                        </div>
                        <span className="text-sm md:text-base font-medium">{phone}</span>
                      </a>
                    )}
                    {email && (
                      <a
                        href={`mailto:${email}`}
                        className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-restro-green transition-colors"
                      >
                        <div className="bg-gray-100 dark:bg-restro-bg-gray p-2 rounded-xl">
                          <IconMail stroke={iconStroke} size={18} />
                        </div>
                        <span className="text-sm md:text-base font-medium">{email}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Catégories modernes */}
        <div className="px-4 mb-8">
          <div className="sticky top-24 z-40 bg-white dark:bg-restro-card-bg rounded-2xl p-4 shadow-lg border border-restro-border-green">
            <div className="flex gap-3 overflow-x-auto pb-2">
              <label className="min-w-fit">
                <input
                  onChange={(e) => {
                    setState({
                      ...state,
                      currentCategory: e.target.value,
                    });
                  }}
                  type="radio"
                  name="category"
                  id={"all"}
                  value={"all"}
                  className="peer hidden"
                  defaultChecked
                />
                <label
                  htmlFor={"all"}
                  className="cursor-pointer rounded-2xl px-6 py-3 bg-gray-100 dark:bg-restro-bg-gray border border-restro-border-green hover:bg-restro-green hover:text-white transition-all duration-300 text-gray-700 dark:text-gray-200 peer-checked:bg-restro-green peer-checked:text-white peer-checked:shadow-lg flex items-center font-medium"
                >
                  <span>{t("qr_menu.all")}</span>
                </label>
              </label>
              {categories.filter(category => category.is_enabled).map((category, index) => {
                const { id, title } = category;
                return (
                  <div key={index} className="min-w-fit">
                    <input
                      onChange={(e) => {
                        setState({
                          ...state,
                          currentCategory: e.target.value,
                        });
                      }}
                      type="radio"
                      name="category"
                      id={id}
                      value={id}
                      className="peer hidden"
                    />
                    <label
                      htmlFor={id}
                      className="cursor-pointer rounded-2xl px-6 py-3 bg-gray-100 dark:bg-restro-bg-gray border border-restro-border-green hover:bg-restro-green hover:text-white transition-all duration-300 text-gray-700 dark:text-gray-200 peer-checked:bg-restro-green peer-checked:text-white peer-checked:shadow-lg flex items-center font-medium"
                    >
                      <span>{title}</span>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Menu items modernes */}
        <div className="px-4 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuItems
              .filter((menuItem) => menuItem.is_enabled)
              .filter((item) => {
                const { category_id } = item;
                if (currentCategory == "all") {
                  return !category_id || categories.find(category => category.id === category_id && category.is_enabled);
                }
                if (currentCategory == category_id) {
                  return true;
                }
                return false;
              })
              .filter((menuItem) => {
                if (!searchQuery) {
                  return true;
                }
                return new String(menuItem.title)
                  .trim()
                  .toLowerCase()
                  .includes(searchQuery.trim().toLowerCase());
              })
              .map((item, i) => {
                const {
                  addons,
                  variants,
                  category_id,
                  category_title,
                  id,
                  image,
                  price,
                  tax_id,
                  tax_rate,
                  tax_title,
                  tax_type,
                  title,
                  description,
                } = item;
                const imageURL = getImageURL(image);
                const hasVariantOrAddon = variants?.length > 0 || addons?.length > 0;
                return (
                  <div
                    key={id}
                    className={`group bg-white dark:bg-restro-card-bg rounded-3xl p-6 shadow-xl border border-restro-border-green hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 ${!is_qr_order_enabled ? "cursor-pointer" : ""}`}
                    onClick={
                      !is_qr_order_enabled
                        ? () =>
                            btnOpenMenuItemDetail(
                              addons,
                              variants,
                              category_id,
                              category_title,
                              id,
                              image,
                              price,
                              tax_id,
                              tax_rate,
                              tax_title,
                              tax_type,
                              title
                            )
                        : undefined
                    }
                  >
                    <div className="flex gap-6">
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="w-32 h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden bg-gray-100 dark:bg-restro-bg-gray shadow-lg">
                            {image ? (
                              <img
                                src={imageURL}
                                alt={title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <IconCarrot className="text-gray-400 dark:text-gray-500" size={48} />
                              </div>
                            )}
                          </div>
                          {is_qr_order_enabled && (
                            <button
                              className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-restro-green text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 text-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (hasVariantOrAddon) {
                                  btnOpenMenuItemDetail(
                                    addons,
                                    variants,
                                    category_id,
                                    category_title,
                                    id,
                                    image,
                                    price,
                                    tax_id,
                                    tax_rate,
                                    tax_title,
                                    tax_type,
                                    title
                                  );
                                } else {
                                  addItemToCart(item);
                                }
                              }}
                            >
                              {t("qr_menu.add")}
                            </button>
                          )}
                        </div>
                        {is_qr_order_enabled && hasVariantOrAddon && (
                          <div className="text-center mt-4">
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-200 text-xs font-medium">
                              {t("qr_menu.customisable")}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-2">
                          {title}
                        </h3>
                        {description && (
                          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base line-clamp-2 mb-4">
                            {description}
                          </p>
                        )}
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-2xl md:text-3xl font-bold text-restro-green">
                            {currency}{price}
                          </span>
                          {category_id && (
                            <span className="px-3 py-1 bg-gray-100 dark:bg-restro-bg-gray text-gray-600 dark:text-gray-300 rounded-full text-xs font-medium">
                              {category_title}
                            </span>
                          )}
                        </div>
                        {(variants.length > 0 || addons.length > 0) && (
                          <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
                            {variants.length > 0 && (
                              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                                {variants.length} {t("qr_menu.variants_available")}
                              </span>
                            )}
                            {addons.length > 0 && (
                              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
                                {addons.length} {t("qr_menu.addons_available")}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Bottom spacing pour le panier */}
        {is_qr_order_enabled && <div className="h-32" />}

        {/* Panier sticky moderne */}
        {is_qr_order_enabled && cartItems.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black shadow-lg p-4 flex justify-between items-center rounded-2xl max-w-5xl mx-auto z-50">
            <button
              onClick={() => {
                navigate(`/m/${qrcode}/cart`, {
                  state: { storeTable: state.storeTable, currency: currency, serviceCharge: serviceCharge },
                });
              }}
              className="bg-restro-green text-white py-4 px-6 rounded-xl flex justify-between w-full items-center"
            >
              <span className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-restro-green font-bold text-lg shadow border-2 border-restro-green">
                  {cartItems.length}
                </span>
                <span className="text-md font-bold md:text-lg">{t('qr_menu.items_added')}</span>
              </span>
              <span className="text-white text-lg md:text-xl font-bold px-2 rounded-lg flex items-center">
                {t('qr_menu.view_cart')} <IconChevronRight size={20} stroke={3} />
              </span>
            </button>
          </div>
        )}

        {/* Modal détails du restaurant */}
        <dialog
          id="modal_store_details"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className='modal-box bg-white dark:bg-restro-card-bg border border-restro-border-green rounded-3xl shadow-2xl'>
            <div className="flex justify-between items-center mb-8">
              <LanguageChanger className="rounded-2xl px-4 py-3 bg-gray-100 dark:bg-restro-bg-gray border border-restro-border-green focus:border-restro-green transition-all" />
              <div className="flex gap-3">
                <button className="btn btn-circle bg-restro-green text-white border-0 hover:shadow-lg" onClick={btnShare}>
                  <IconShare stroke={iconStroke} />
                </button>
                <form method="dialog">
                  <button className="btn btn-circle bg-gray-100 dark:bg-restro-bg-gray border-0 hover:bg-gray-200 dark:hover:bg-restro-button-hover">
                    <IconX stroke={iconStroke} />
                  </button>
                </form>
              </div>
            </div>
            <div className="text-center mb-8">
              <div className="mb-6">
                {storeImage && (
                  <div className="relative w-fit mx-auto">
                    <img
                      src={getImageURL(storeImage)}
                      className="w-32 h-32 md:w-40 md:h-40 rounded-3xl shadow-2xl mx-auto object-cover border-4 border-restro-green/20"
                      alt={`${storeName} Logo`}
                    />
                    {/* Badge Premium rond en bas à droite (modal) */}
                    <div className="absolute -bottom-2 -right-2 bg-restro-green flex items-center justify-center w-8 h-8 rounded-full shadow-lg border-2 border-white dark:border-restro-card-bg">
                      <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='white' viewBox='0 0 20 20'><path d='M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z'/></svg>
                    </div>
                  </div>
                )}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                {storeName}
              </h2>
            </div>
            <div className="space-y-4">
              {address && (
                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-restro-bg-gray rounded-2xl">
                  <div className="bg-restro-green/20 p-3 rounded-xl">
                    <IconMapPin stroke={iconStroke} size={20} className="text-restro-green" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-200 flex-1">{address}</p>
                </div>
              )}
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-restro-bg-gray rounded-2xl hover:bg-gray-100 dark:hover:bg-restro-button-hover transition-colors"
                >
                  <div className="bg-restro-green/20 p-3 rounded-xl">
                    <IconPhone stroke={iconStroke} size={20} className="text-restro-green" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-200 flex-1">{phone}</p>
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-restro-bg-gray rounded-2xl hover:bg-gray-100 dark:hover:bg-restro-button-hover transition-colors"
                >
                  <div className="bg-restro-green/20 p-3 rounded-xl">
                    <IconMail stroke={iconStroke} size={20} className="text-restro-green" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-200 flex-1">{email}</p>
                </a>
              )}
            </div>
          </div>
        </dialog>
        {/* Modal détail plat moderne - FIN */}
      </div>
    </div>
  );
}
