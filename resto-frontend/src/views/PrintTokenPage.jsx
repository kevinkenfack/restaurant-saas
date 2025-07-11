import React from "react";
import { getDetailsForReceiptPrint } from "../helpers/ReceiptHelper";
import { useTranslation } from "react-i18next";

export default function PrintTokenPage() {
  const { t } = useTranslation();
  const receiptDetails = getDetailsForReceiptPrint();

  const {
    storeSettings = {},
    printSettings = {},
    tokenNo = ''
  } = receiptDetails || {};

  const page_format = printSettings?.page_format || 80;

  if (!tokenNo) return null;

  return (
    <div className={`w-[${page_format}mm] font-sans bg-white text-black p-4 mx-auto`}>
      <div className="text-center mt-8">
        <div className="border-t-2 border-black pt-6">
          <p className="font-bold mb-4">{t("print_receipt.token_no")}</p>
          <div className="border-4 border-black rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold">{tokenNo}</span>
          </div>
          <p className="text-sm">{t("print_receipt.present_token")}</p>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-gray-700">
        {new Date().toLocaleString('en-US', {
          hour12: true,
          dateStyle: "long",
          timeStyle: "short"
        })}
      </p>
    </div>
  );
}
