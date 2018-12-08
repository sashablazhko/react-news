import React from "react";

import classes from "./Footer.module.css";

function Footer() {
  const cls = [classes.Footer, "grid-item"];
  return (
    <div className={cls.join(" ")}>
      <span>
        "Без воды", тестовое задание #3. Автор: <a href="mailto:sashablazhko@gmail.com">sashablazhko@gmail.com</a>
      </span>
    </div>
  );
}

export default Footer;
