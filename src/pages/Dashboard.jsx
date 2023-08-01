import React, { useState, useEffect } from "react";
// Data 
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List"; 

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";


const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});
  const [filteredOrders, setFilteredOrders] = useState(mockData.results);
  const numofOrders = mockData.results.length;

  useEffect(() => {
    const filtered = mockData.results.filter((order) =>
      order["&id"].toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredOrders(filtered);
  }, [searchText]);

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredOrders(mockData.results);
    }
  }, [searchText]);

  const onSelectOrder = (order) => {
    const selectedOrderDetails = {
      "Buy/Sell Indicator": order.executionDetails.buySellIndicator,
      "Order Status": order.executionDetails.orderStatus,
      "Order Type": order.executionDetails.orderType,
    };
  
    const selectedOrderTimestamps = timestamps.results.find(
      (item) => item["&id"] === order["&id"]
    );

    // testing output 
    console.log("selectedOrderDetails:", selectedOrderDetails);
    console.log("selectedOrderTimestamps:", selectedOrderTimestamps);
  
    
    setSelectedOrderDetails(selectedOrderDetails);
    setSelectedOrderTimeStamps(selectedOrderTimestamps.timestamps);
  };
  const selectedOrderDetailsLabels = [
    "Buy/Sell Indicator",
    "Order Status",
    "Order Type",
  ];

  const selectedOrderTimestampsLabels = [
    "Order Received",
    "Order Status Updated",
    "Order Submitted",
  ];

  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle primaryTitle="Orders" secondaryTitle={`${numofOrders} orders`}/>
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => handleSearchTextChange(e.target.value)}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
            labels={selectedOrderDetailsLabels}
          />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
            labels={selectedOrderTimestampsLabels}
          />
        </div>
        <List rows={filteredOrders} timestamps={timestamps.results} selectedCurrency={currency} onSelectOrder={onSelectOrder}/>
      </div>
    </div>
  );
};
export default Dashboard;
