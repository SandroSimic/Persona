import { useState, useEffect } from 'react'

const useWindowSize = () => {
    const [ws, setWS] = useState({
        width: window?.innerWidth,
        height: window?.innerHeight,
        mobile: window?.innerWidth <= 576 ? true : false,
        miniTablet: window?.innerWidth <= 700 ? true : false,
        tablet: window?.innerWidth <= 991 ? true : false,
        desktop: window?.innerWidth > 991 ? true : false,
        bigDesktop: window?.innerWidth > 1280 ? true : false,
        size: window?.innerWidth <= 576 ? 'small' : window?.innerWidth <= 991 ? 'medium' : 'large'
    });

    useEffect(() => {
        const handleResize = () => {
            setWS({
                width: window?.innerWidth,
                height: window?.innerHeight,
                mobile: window?.innerWidth <= 576 ? true : false,
                miniTablet: window?.innerWidth <= 700 ? true : false,
                tablet: window?.innerWidth <= 991 ? true : false,
                desktop: window?.innerWidth > 991 ? true : false,
                bigDesktop: window?.innerWidth > 1280 ? true : false,
                size: window?.innerWidth <= 576 ? 'small' : window?.innerWidth <= 991 ? 'medium' : 'large'
            });
        };

        window?.addEventListener('resize', handleResize);

        return () => {
            window?.removeEventListener('resize', handleResize);
        }
    }, []);

    return ws
}

export default useWindowSize