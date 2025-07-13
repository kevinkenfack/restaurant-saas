import {
  IconCarrot,
  IconChevronRight,
  IconMail,
  IconMapPin,
  IconMenu,
  IconPhone,
  IconShare,
  IconX,
  IconInfoCircle,
} from "@tabler/icons-react";
import React, { useEffect, useState, useRef } from "react";
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

  const [infoMenuItem, setInfoMenuItem] = useState(null);
  const infoMenuModalRef = useRef(null);

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
    <div className="w-full">
      <div className="container mx-auto">
        {/* appbar */}
        <div className="px-4 pt-4 pb-2 w-full max-w-5xl mx-auto sticky z-50 top-0">
          <div className="flex gap-2 items-center bg-white dark:bg-restro-card-bg rounded-2xl shadow border border-restro-border-green px-4 py-2">
            <span className="text-gray-400">
              <IconCarrot size={20} stroke={iconStroke} />
            </span>
            <input
              type="search"
              name="search"
              id="search"
              className="flex-1 bg-transparent outline-none px-2 py-2 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
              placeholder={t("qr_menu.search_placeholder")}
              value={searchQuery}
              onChange={(e) => {
                setState({
                  ...state,
                  searchQuery: e.target.value,
                });
              }}
            />
            <button
              className="bg-gray-100 dark:bg-restro-bg-gray rounded-xl p-2 ml-2 hover:bg-restro-green/10 transition"
              onClick={() =>
                document.getElementById("modal_store_details").showModal()
              }
            >
              <IconMenu stroke={iconStroke} size={20}/>
            </button>
          </div>
        </div>
        {/* appbar */}

        {/* store details: name, phone, address, email, share menu link */}
        <div className="px-4 py-8 w-full max-w-5xl mx-auto">
          <div className="bg-white dark:bg-restro-card-bg rounded-3xl p-8 shadow-2xl border border-restro-border-green w-full">
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
        {/* store details: name, phone, address, email, share menu link */}

        {/* categories */}
        <div className="w-full max-w-5xl mx-auto mt-2 pb-2">
          <div className="flex gap-2 overflow-x-auto px-2 py-2 bg-white/80 dark:bg-black/80 backdrop-blur rounded-2xl border border-restro-border-green shadow">
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
              <span
                htmlFor={"all"}
                className="cursor-pointer rounded-full px-5 py-2 bg-gray-100 dark:bg-restro-bg-gray border border-restro-border-green hover:bg-restro-green hover:text-white transition-all duration-200 text-gray-700 dark:text-gray-200 peer-checked:bg-restro-green peer-checked:text-white peer-checked:shadow-lg flex items-center font-medium text-sm"
                style={{ minWidth: 'max-content' }}
              >
                {t("qr_menu.all")}
              </span>
            </label>
            {categories.filter(category => category.is_enabled).map((category, index) => {
              const { id, title } = category;
              return (
                <label key={index} className="min-w-fit">
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
                  <span
                    htmlFor={id}
                    className="cursor-pointer rounded-full px-5 py-2 bg-gray-100 dark:bg-restro-bg-gray border border-restro-border-green hover:bg-restro-green hover:text-white transition-all duration-200 text-gray-700 dark:text-gray-200 peer-checked:bg-restro-green peer-checked:text-white peer-checked:shadow-lg flex items-center font-medium text-sm"
                    style={{ minWidth: 'max-content' }}
                  >
                    {title}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
        {/* categories */}

        {/* menu items */}
        <div className="p-2 w-full max-w-5xl mx-auto mt-4">
          {(() => {
            const filteredItems = menuItems
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
              });

            if (filteredItems.length === 0) {
              return (
                <div className="flex flex-col items-center justify-center py-12 px-4">
                  <div className="w-24 h-24 bg-gray-100 dark:bg-restro-bg-gray rounded-full flex items-center justify-center mb-4">
                    <IconCarrot className="text-gray-400 dark:text-gray-500" size={48} />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {searchQuery 
                      ? t("qr_menu.no_items_found") 
                      : currentCategory === "all" 
                        ? t("qr_menu.no_menu_available") 
                        : t("qr_menu.no_items_in_category")
                    }
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm text-center max-w-md">
                    {searchQuery 
                      ? t("qr_menu.try_different_search") 
                      : currentCategory === "all" 
                        ? t("qr_menu.menu_coming_soon") 
                        : t("qr_menu.category_empty")
                    }
                  </p>
                </div>
              );
            }

            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredItems.map((item, i) => {
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
                  // addon {id, item_id, title, price}
                  // variant {id, item_id, title, price}

                  const imageURL = getImageURL(image);
                  const hasVariantOrAddon =
                    variants?.length > 0 || addons?.length > 0;

                  return (
                    <div
                      key={id}
                      className={`group bg-white dark:bg-restro-card-bg rounded-2xl shadow-xl border border-restro-border-green hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-stretch p-3 md:p-4 ${!is_qr_order_enabled ? "hover:bg-gray-100 dark:hover:bg-restro-button-hover cursor-pointer" : ""}`}
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
                      {/* Image en haut, bien large, carré, coins arrondis */}
                      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-restro-bg-gray shadow mb-3 flex items-center justify-center">
                        {image ? (
                          <img
                            src={imageURL}
                            alt={title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <IconCarrot className="text-gray-400 dark:text-gray-500" size={48} />
                        )}
                        {/* Badge customisable */}
                        {is_qr_order_enabled && (variants.length > 0 || addons.length > 0) && (
                          <div className="absolute top-2 right-2 bg-restro-green text-white text-xs px-2 py-1 rounded-full shadow font-bold">
                            {t("qr_menu.customisable")}
                          </div>
                        )}
                      </div>
                      {/* Infos sous l'image */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between px-1 pb-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-base md:text-lg font-bold text-gray-800 dark:text-white line-clamp-2">
                            {title}
                          </h3>
                          <button
                            type="button"
                            className="ml-2 bg-gray-100/80 dark:bg-black/60 rounded-full p-1 shadow text-restro-green dark:text-white hover:bg-restro-green hover:text-white transition"
                            onClick={e => {
                              e.stopPropagation();
                              setInfoMenuItem(item);
                              setTimeout(() => {
                                if (infoMenuModalRef.current) infoMenuModalRef.current.showModal();
                              }, 0);
                            }}
                            title={t('qr_menu.see_more')}
                            aria-label={t('qr_menu.see_more')}
                          >
                            <IconInfoCircle size={18} className="text-inherit" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg font-bold text-restro-green">
                            {currency}{price}
                          </span>
                          {category_id && (
                            <span className="px-2 py-1 bg-gray-100 dark:bg-restro-bg-gray text-gray-600 dark:text-gray-300 rounded-full text-xs font-medium ml-2">
                              {category_title}
                            </span>
                          )}
                        </div>
                        {description && (
                          <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm line-clamp-2 mb-2">
                            {description}
                          </p>
                        )}
                        {(variants.length > 0 || addons.length > 0) && (
                          <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
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
                        {is_qr_order_enabled && (
                          <div className="pt-1 pb-1">
                            <button
                              className="w-full bg-restro-green text-white px-3 py-2 rounded-lg font-bold shadow hover:shadow-lg active:scale-95 transition-all duration-300 text-xs md:text-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (hasVariantOrAddon) {
                                  setState({
                                    ...state,
                                    currentItem: item,
                                    currentItemId: id,
                                  });
                                  document.getElementById("modal_item_detail").showModal();
                                } else {
                                  addItemToCart(item);
                                }
                              }}
                            >
                              {t("qr_menu.add")}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
        {/* menu items */}

        {is_qr_order_enabled && <div className="h-10" />}

        {/* Copyright en bas de page */}
        <div className="w-full max-w-5xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} {storeName}. {t("qr_menu.all_rights_reserved")}
            </p>
          </div>
        </div>

        {is_qr_order_enabled && cartItems.length > 0 && (
          <div
            className="p-2 w-full max-w-5xl mx-auto fixed bottom-0 left-0 right-0 bg-white dark:bg-black shadow-lg flex justify-between items-center rounded-2xl"
            style={{ boxShadow: "0 -4px 10px rgba(0, 0, 0, 0.1)" }}
          >
            <button
              onClick={() => {
                navigate(`/m/${qrcode}/cart`, {
                  state: { storeTable: state.storeTable, currency: currency, serviceCharge: serviceCharge },
                });
              }}
              className="bg-restro-green text-white py-4 px-6 flex justify-between items-center rounded-xl w-full"
            >
              <p className="text-md font-bold md:text-xl">
                {cartItems.length} {t("qr_menu.items_added")}
              </p>
              <p className="text-white text-lg font-bold px-2 rounded-lg flex gap-1 items-center md:text-2xl">
                {t("qr_menu.view_cart")}
                <IconChevronRight size={22} stroke={3} />
              </p>
            </button>
          </div>
        )}

        {/* store details: name, phone, address, email, share menu link */}
        <dialog
          id="modal_store_details"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className='modal-box bg-white dark:bg-restro-card-bg border border-restro-border-green rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 max-w-md mx-auto'>
            <div className="flex justify-between items-center mb-6">
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
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-2">
                {storeImage ? (
                  <img
                    src={getImageURL(storeImage)}
                    className="w-28 h-28 md:w-32 md:h-32 rounded-3xl shadow-2xl object-cover border-4 border-restro-green/20"
                    alt={`${storeName} Logo`}
                  />
                ) : (
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-3xl bg-restro-green flex items-center justify-center shadow-2xl">
                    <IconCarrot className="text-white" size={48} />
                  </div>
                )}
                {/* Badge Premium rond en bas à droite */}
                <div className="absolute -bottom-2 -right-2 bg-restro-green flex items-center justify-center w-8 h-8 rounded-full shadow-lg border-2 border-white dark:border-restro-card-bg">
                  <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='white' viewBox='0 0 20 20'><path d='M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z'/></svg>
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2 text-center">{storeName}</h2>
            </div>
            <div className="space-y-4">
              {address && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-restro-bg-gray rounded-2xl">
                  <div className="bg-restro-green/20 p-2 rounded-xl">
                    <IconMapPin stroke={iconStroke} size={20} className="text-restro-green" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-200 flex-1 text-sm md:text-base">{address}</p>
                </div>
              )}
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-restro-bg-gray rounded-2xl hover:bg-gray-100 dark:hover:bg-restro-button-hover transition-colors"
                >
                  <div className="bg-restro-green/20 p-2 rounded-xl">
                    <IconPhone stroke={iconStroke} size={20} className="text-restro-green" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-200 flex-1 text-sm md:text-base">{phone}</span>
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-restro-bg-gray rounded-2xl hover:bg-gray-100 dark:hover:bg-restro-button-hover transition-colors"
                >
                  <div className="bg-restro-green/20 p-2 rounded-xl">
                    <IconMail stroke={iconStroke} size={20} className="text-restro-green" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-200 flex-1 text-sm md:text-base">{email}</span>
                </a>
              )}
            </div>
          </div>
        </dialog>
        {/* store details: name, phone, address, email, share menu link */}

        {/* dialog for detail menu item view with addon, variants */}
        <dialog
          id="modal_item_detail"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className='bg-white dark:bg-black border border-restro-border-green px-4 py-4 m-2 rounded-2xl'>
            <div className="absolute top-4 right-4">
              <form method="dialog">
                <button className="btn btn-circle">
                  <IconX stroke={iconStroke} />
                </button>
              </form>
            </div>

            <div className="w-full flex gap-4">
              <div className="rounded-2xl w-32 h-32 object-cover relative bg-gray-200 flex items-center justify-center text-gray-500 ">
                {currentItem?.image ? (
                  <img
                    src={getImageURL(currentItem?.image)}
                    alt={currentItem?.title}
                    className="w-full h-full absolute top-0 left-0 rounded-2xl object-cover z-0"
                  />
                ) : (
                  <IconCarrot />
                )}
              </div>
              <div className="flex-1">
                <p className="text-lg">{currentItem?.title}</p>
                <p className="text-sm text-restro-green font-bold">
                  {currency}
                  {currentItem?.price}
                </p>
                {currentItem?.category_id && (
                  <p className="mt-2 text-xs text-gray-500">
                    {t("qr_menu.category")}: {currentItem?.category_title}
                  </p>
                )}
                <div className="flex gap-2 mt-2 text-xs text-gray-500">
                  {currentItem?.variants.length > 0 && (
                    <p>{currentItem?.variants.length} {t("qr_menu.variants_available")}</p>
                  )}
                  {currentItem?.addons.length > 0 && (
                    <p>{currentItem?.addons.length} {t("qr_menu.addons_available")}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="my-4 flex flex-col sm:flex-row gap-2">
              {currentItem?.variants.length > 0 && (
                <div className="flex-1">
                  <h3>{t("qr_menu.variants")}</h3>
                  <div className="flex flex-col gap-2 mt-2">
                    {currentItem?.variants?.map((variant, index) => {
                      const { id, title, price } = variant;
                      return (
                        <label
                          key={index}
                          className="cursor-pointer label justify-start gap-2"
                        >
                          <input
                            type="radio"
                            className="radio"
                            name="variants"
                            id={id}
                            value={id}
                            defaultChecked={index === 0}
                          />
                          <span className="label-text">
                            {title} - {currency}
                            {price}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {currentItem?.addons.length > 0 && (
                <div className="flex-1">
                  <h3>{t("qr_menu.addons")}</h3>
                  <div className="flex flex-col gap-2 mt-2">
                    {currentItem?.addons?.map((addon, index) => {
                      const { id, title, price } = addon;
                      return (
                        <label
                          key={index}
                          className="cursor-pointer label justify-start gap-2"
                        >
                          <input
                            type="checkbox"
                            name="addons"
                            className="checkbox checkbox-sm"
                            value={id}
                          />
                          <span className="label-text">
                            {title} (+{currency}
                            {price})
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {is_qr_order_enabled && (
              <div className="modal-action flex justify-end w-full">
                <form method="dialog" className="w-full">
                  <button
                    onClick={() => {
                      btnAddMenuItemToCartWithVariantsAndAddon();
                    }}
                    className="w-full rounded-lg hover:bg-green-800 transition active:scale-95 hover:shadow-lg px-6 py-2 bg-restro-green text-white font-bold"
                  >
                    {t("qr_menu.add_to_cart")}
                  </button>
                </form>
              </div>
            )}

            <p className="text-gray-500 text-xs mt-1">
              *{t("qr_menu.price_disclaimer")}
            </p>
          </div>
        </dialog>


        {/* dialog for detail menu item view */}
        {/* Modal info menu (nom, image, catégorie, description complète) */}
        <dialog ref={infoMenuModalRef} id="modal_info_menu" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-white dark:bg-restro-card-bg border border-restro-border-green rounded-t-3xl sm:rounded-3xl shadow-2xl max-w-md mx-auto p-0 overflow-hidden">
            <div className="flex justify-between items-center mb-6 px-6 pt-6">
              <div></div>
              <form method="dialog">
                <button
                  type="button"
                  className="btn btn-circle bg-gray-100 dark:bg-restro-bg-gray border-0 hover:bg-gray-200 dark:hover:bg-restro-button-hover"
                  onClick={() => infoMenuModalRef.current && infoMenuModalRef.current.close()}
                >
                  <IconX stroke={iconStroke} />
                </button>
              </form>
            </div>
            <div className="flex flex-col items-center justify-center w-full px-6 pb-6">
              {infoMenuItem?.image ? (
                <img
                  src={getImageURL(infoMenuItem.image)}
                  alt={infoMenuItem.title}
                  className="w-28 h-28 md:w-32 md:h-32 rounded-2xl object-cover shadow mb-4"
                />
              ) : (
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-gray-100 dark:bg-restro-bg-gray flex items-center justify-center mb-4">
                  <IconCarrot className="text-gray-400 dark:text-gray-500" size={48} />
                </div>
              )}
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-2 text-center">
                {infoMenuItem?.title}
              </h2>
              {infoMenuItem?.category_title && (
                <span className="px-3 py-1 bg-gray-100 dark:bg-restro-bg-gray text-gray-600 dark:text-gray-300 rounded-full text-xs font-medium mb-2">
                  {infoMenuItem.category_title}
                </span>
              )}
              {infoMenuItem?.description && (
                <p className="text-gray-700 dark:text-gray-200 text-base whitespace-pre-line text-center mt-2">
                  {infoMenuItem.description}
                </p>
              )}
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}
