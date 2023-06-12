import Link from 'next/link';
import styles from './custom-link.module.css';

export interface CustomLinkProps {
  as?: string;
  href?: string;
  children?: React.ReactNode;
}

export function CustomLink({ as, href = '', ...rest }: CustomLinkProps) {
  return <Link className={styles.customLink} as={as} href={href} {...rest} />;
}

export default CustomLink;
