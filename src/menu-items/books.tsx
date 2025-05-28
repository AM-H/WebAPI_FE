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
          title: <FormattedMessage id="Search Books" />,
          type: 'item',
          url: '/books/list',
          icon: icons.BookIcon
        },
        {
          id: 'book-filter',
          title: <FormattedMessage id="Filter & Paginate Books" />,
          type: 'item',
          url: '/books/filter-paginate',
          icon: icons.BookIcon
        }
      ]
    }
  ]
};

export default booksMenu;
