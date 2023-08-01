import React from "react";

import ListRow from "./ListRow";
import ListRowCell from "./ListRowCell";

import ListHeader from "./ListHeader";
import ListHeaderCell from "./ListHeaderCell";

import styles from "./List.module.css";

const List = ({ rows, timestamps, selectedCurrency, onSelectOrder }) => {
  const timestampMap = {};
  timestamps.forEach((timestamp) => {
    timestampMap[timestamp["&id"]] = timestamp.timestamps.orderSubmitted;
  });

  const conversionRates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110.50,
  };
  const convertCurrency = (usdValue, currency) => {
    return (usdValue * conversionRates[currency]).toFixed(2);
  };
  const handleClick = (row) => {
    const selectedOrderId = row["&id"];
    const selectedOrderTimestamps = timestamps.find(
      (timestamp) => timestamp["&id"] === selectedOrderId
    );
    console.log("selectedOrderTimestamps:", selectedOrderTimestamps);

    const timestampsData = {
      "Order Received": selectedOrderTimestamps.orderReceived,
      "Order Status Updated": selectedOrderTimestamps.orderStatusUpdated,
      "Order Submitted": selectedOrderTimestamps.orderSubmitted,
    };

    onSelectOrder(row, timestampsData);
  };

  return (
    <table className={styles.container}>
      <thead>
        <ListHeader>
          <ListHeaderCell>Order ID</ListHeaderCell>
          <ListHeaderCell>Buy/Sell</ListHeaderCell>
          <ListHeaderCell>Country</ListHeaderCell>
          <ListHeaderCell>Order Submitted</ListHeaderCell>
          <ListHeaderCell>
            Order Volume / {selectedCurrency}
          </ListHeaderCell>
        </ListHeader>
      </thead>
      <tbody>
        {rows.map((row) => (
          <ListRow key={row["&id"]} onClick={() => handleClick(row)}>
            <ListRowCell>{row["&id"]}</ListRowCell>
            <ListRowCell>
              {row.executionDetails.buySellIndicator}
            </ListRowCell>
            <ListRowCell>{row.executionDetails.orderStatus}</ListRowCell>
            <ListRowCell>{timestampMap[row["&id"]]}</ListRowCell>
            <ListRowCell>
              {convertCurrency(
                row.bestExecutionData.orderVolume.USD,
                selectedCurrency
              )}
            </ListRowCell>
          </ListRow>
        ))}
      </tbody>
    </table>
  );
};

export default List;