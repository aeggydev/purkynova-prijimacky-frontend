import "./styles/output.css";
import React from "react"

type Props = {
  title: string;
};

function MenubarItem({ title }: Props) {
  return <a className="btn btn-ghost btn-sm rounded-btn">{title}</a>;
}

export default MenubarItem;
