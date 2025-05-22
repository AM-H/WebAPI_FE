// third-party
import { FormattedMessage } from 'react-intl';

// assets
import BookIcon from '@mui/icons-material/MenuBook';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { BookIcon };

// ==============================|| MENU ITEMS - BOOKS ||============================== //

const booksMenu: NavItemType = {
  id: 'group-books',
  title: <FormattedMessage id="Books" />,
  type: 'group',
  children: [
    {
      id: 'books',
      title: <FormattedMessage id="Books" />,
      type: 'collapse',
      icon: icons.BookIcon,
      children: [
        {
          id: 'book-list',
          title: <FormattedMessage id="View-Books" />,
          type: 'item',
          url: '/books/list',
          icon: icons.BookIcon
        }
      ]
    }
  ]
};

export default booksMenu;
