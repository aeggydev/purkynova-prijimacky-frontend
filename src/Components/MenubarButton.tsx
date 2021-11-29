import React from "react"

type Props = {
  title: string;
};

function MenubarItem({ title }: Props) {
  return <span /*className="btn btn-ghost btn-sm rounded-btn"*/>{title}</span>;
}

export default MenubarItem;
