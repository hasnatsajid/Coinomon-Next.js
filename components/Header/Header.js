import styles from './header.module.scss';
import Logos from '../../svgs/logo.svg';
import MenuIcon from '../../svgs/menu.svg';
import CloseIcon from '../../svgs/close.svg';
import FacebookIcon from '../../svgs/facebook.svg';
import InstagramIcon from '../../svgs/instagram.svg';
import DiscordIcon from '../../svgs/discord.svg';
import TelegramIcom from '../../svgs/telegram.svg';
import BlogIcon from '../../svgs/blog.svg';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.mainHeader}>
      <div className={styles['desktop-menu']}>
        <Link href="/">
          <a>
            <div className={styles.logo}>
              <div className={styles.logo}>
                <Logos />
              </div>
              <div className="logo-title">Coinomon</div>
            </div>
          </a>
        </Link>
        <div className={styles['nav-items']}>
          <div>
            <Link href="/learn">
              <a>Learn</a>
            </Link>
          </div>
          <div>
            <Link href="/cryptocurrencies">
              <a>Prices</a>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles['mobile-menu']}>
        <div className={styles.logo}>
          <Link href="/">
            <a>
              <Logos />
              <div className={styles['logo-title']}>Coinomon</div>
            </a>
          </Link>
        </div>
        <div className={styles['menu-icon']} onClick={menuToggler}>
          {<MenuIcon />}
        </div>
      </div>
      <div className={`${styles.menuOverlay} ${isMenuOpen && styles.open} `}>
        {isMenuOpen && (
          <div className={styles['mobile-menu']}>
            <div className={styles.logo}>
              <Logos />
              <div className={styles['logo-title']}>Coinomon</div>
            </div>
            <div className={styles['menu-icon']} onClick={menuToggler}>
              <CloseIcon />
            </div>
          </div>
        )}
        <div className={`${styles.navItems} ${!isMenuOpen && styles.hide}`}>
          <div>
            <Link href="/learn">
              <a onClick={menuToggler}>Learn</a>
            </Link>
          </div>
          <div>
            <Link href="/cryptocurrencies">
              <a onClick={menuToggler}>Prices</a>
            </Link>
          </div>
        </div>
        <div className={`${styles.socialIcons} ${!isMenuOpen && styles.hide}`}>
          <Link href="https://web.facebook.com/groups/1042692876675171">
            <a>
              <FacebookIcon />
            </a>
          </Link>
          <Link href="https://www.instagram.com/coinomon">
            <a>
              <InstagramIcon />
            </a>
          </Link>
          <Link href="https://discord.gg/PspF2cnF">
            <a>
              <DiscordIcon />
            </a>
          </Link>
          <Link href="https://t.me/coinomonofficial">
            <a>
              <TelegramIcom />
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
