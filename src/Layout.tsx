import React, {PropsWithChildren} from 'react';
import {Link} from "react-router-dom";

const Layout = (props: PropsWithChildren) => {
    return (
        <div style={{display: 'flex'}}>
            <nav style={{flex: 1}}>
                <Link to={'/example'} style={{display: 'block'}}>Example</Link>
                <Link to={'/simple-to-do'} style={{display: 'block'}}>Simple ToDo</Link>
            </nav>
            <section style={{flex: 9}}>
                {props.children}
            </section>
        </div>
    )
}

export default Layout;
