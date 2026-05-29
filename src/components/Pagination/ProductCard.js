import styles from './Pagination.module.css';

const ProductCard = ({ image, title, key }) => {
  return (
    <div className={styles.ProductCard} key={key}>
      <img src={image} alt='data'/>
      <p>{title}</p>
    </div>
  )
}
export default ProductCard