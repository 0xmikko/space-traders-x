import React from "react";

export interface ResourceItemProps {
  type: string;
  amount: number;
}

export function ResourceItem({ type, amount }: ResourceItemProps) {
  return (
    <React.Fragment>
      <div className={"resourceItem"}>
        <img src={`./img/${type}.png`} alt={type}/>
        <p>${amount}</p>
      </div>
    </React.Fragment>
  );
}
