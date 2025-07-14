import { IconBrandPaypal, IconBuildingBank, IconCash, IconCreditCard, IconDeviceIpad, IconDiscount, IconQrcode, IconWallet } from "@tabler/icons-react";
import { iconStroke } from "./config";
import OrangeMoney from "../assets/payments-icons/om.png";
import MobileMoney from "../assets/payments-icons/momo.png";


export const PAYMENT_ICONS = {
    'cash': <IconCash stroke={iconStroke} />,
    'card': <IconCreditCard stroke={iconStroke} />,
    'wallet': <IconWallet stroke={iconStroke} />,
    'paypal': <IconBrandPaypal stroke={iconStroke} />,
    'qrcode': <IconQrcode stroke={iconStroke} />,
    'reader': <IconDeviceIpad stroke={iconStroke} />,
    'bank': <IconBuildingBank stroke={iconStroke} />,
    'discount': <IconDiscount stroke={iconStroke} />,
    'Orange Money': <img src={OrangeMoney} alt="Orange Money" style={{ height: '30px'}} />,
    'Mobile Money': <img src={MobileMoney} alt="Mobile Money" style={{ height: '30px'}} />,
}