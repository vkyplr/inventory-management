import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
    const pages = [
        { name: 'Dashboard', route: '/' },
        { name: 'Add Stock', route: 'add-stock' },
        { name: 'Stock List', route: 'stock' },
    ];
    return (
        <AppBar position="static" color="primary">
            <Toolbar sx={{ minHeight: '48px !important', maxHeight: '48px !important' }}>
                {
                    pages.map((e, index) => {
                        return <Link key={index} to={e.route}>
                            <Button sx={{ mr: 1, my: 1, color: 'white', display: 'block', fontWeight: 700, fontSize: 15 }}>
                                {e.name}
                            </Button>
                        </Link>
                    })
                }
            </Toolbar>
        </AppBar>
    );
}

export default Header;