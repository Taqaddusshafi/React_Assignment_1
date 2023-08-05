import styles from "./ListRow.module.css";

const ListCell = ({ children ,onClick}) => {
  return <tr onClick={onClick} className={styles.cell}  >{children}</tr>;
};

export default ListCell;
