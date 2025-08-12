import styles from './ErrorMessage.module.css';

export default function ErrorMessage() {
    return <p className={styles.text}>An error occurred, please try again...</p>;
}