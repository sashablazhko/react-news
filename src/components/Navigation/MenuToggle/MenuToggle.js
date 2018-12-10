import React from "react";
import classes from "./MenuToggle.module.css";

const MenuToggle = ({ isOpen, onToggle }) => {
  const cls = [classes.MenuToggle, "fa", isOpen ? ["fa-times", classes.open].join(" ") : "fa-bars"];

  return <i className={cls.join(" ")} onClick={onToggle} />;
};

export default MenuToggle;
