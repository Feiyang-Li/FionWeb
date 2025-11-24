import {NavLink} from "react-router-dom";
import styles from './NavBar.module.css';
import classNames from "classnames";

type NavBarProps = {
    className?: string;
}
export default function NavBar({ className }: NavBarProps) {
  return (
    <nav className={classNames(styles.navbar, className)}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          classNames(styles.element, styles.firstElement, {
            [styles.active]: isActive,
          })
        }
      >
        Main
      </NavLink>

      <div className={styles.groupElements}>
        <NavLink
          to="/software"
          className={({ isActive }) =>
            classNames(styles.element, { [styles.active]: isActive })
          }
        >
          Software
        </NavLink>

        <NavLink
          to="/data"
          className={({ isActive }) =>
            classNames(styles.element, { [styles.active]: isActive })
          }
        >
          Data
        </NavLink>

        <NavLink
          to="/finance"
          className={({ isActive }) =>
            classNames(styles.element, { [styles.active]: isActive })
          }
        >
          Finance
        </NavLink>
        <NavLink
            to="/Blog"
            className={({ isActive }) =>
              classNames(styles.element, { [styles.active]: isActive })
            }
          >
            Blog
        </NavLink>
      </div>

      <NavLink
        to="/contact"
        className={({ isActive }) =>
          classNames(styles.element, styles.EndElement, { [styles.active]: isActive })
        }
      >
        Contact
      </NavLink>

    </nav>
  );
}
