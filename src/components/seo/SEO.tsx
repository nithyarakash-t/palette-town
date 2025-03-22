import { Helmet } from 'react-helmet-async';
import { seoConfig } from '../../config/seo.config';

interface SEOProps {
    title?: string;
    description?: string;
    path?: string;
    children?: React.ReactNode;
}

export function SEO({ 
    title = seoConfig.title,
    description = seoConfig.defaultDescription,
    path = '',
    children 
}: SEOProps) {
    const url = `${seoConfig.siteUrl}${path}`;

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />

            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />

            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            
            {children}
        </Helmet>
    );
}