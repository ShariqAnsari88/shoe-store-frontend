import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleDollarToSlot,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "next-i18next";
import { Button } from "@material-tailwind/react";

export default function AddInfoButton({ onPress, label }) {
  const { t } = useTranslation(["forms, buttons"]);
  return (
    <div onClick={onPress}>
      <div className="flex items-center gap-2 mb-2">
        <div className="bg-neonGreen w-8 h-8 rounded-full flex items-center justify-center">
          <FontAwesomeIcon color="#EEEEEE" icon={faCircleDollarToSlot} />
        </div>
        <h2 className="text-offWhite text-xl font-semibold">
          {t(label, { ns: "forms" })}
        </h2>
      </div>

      <Button
        onClick={onPress}
        size="md"
        className="bg-offWhite text-darkBlack flex gap-2 items-center"
        variant="outlined"
      >
        <FontAwesomeIcon size="2x" cla icon={faSquarePlus} />

        {t("add", { ns: "buttons" })}
      </Button>
    </div>
  );
}
