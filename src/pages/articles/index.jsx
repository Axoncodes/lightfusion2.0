
import dynamic from 'next/dynamic'
const SectionTitle = dynamic(() => import('../../../axg-react/SectionTitle'), {ssr: false})
const LessonBox = dynamic(() => import('../../../components/LessonBox'), {ssr: false})
import style from './course.module.css'
import fetchup from '../../../lib/fetch'
import Header from '../../../fragments/Header'
import Navbar from '../../../fragments/Navbar'
import Breadcrumb from '../../../components/Breadcrumb'
const Axg = dynamic(() => import('../../../axg-react/Run'), {ssr: false})
import Head from 'next/head'
import Footer from '../../../fragments/Footer'

export default function Articles({ categories, course, metatags }) {
	return (
		<>
			<Head>
                <title>{metatags.title}</title>
                <meta name="description" content={metatags.description} key={"description"} />
                <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" key={"robots"} />
                <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" key={"googlebot"} />
                <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" key={"bingbot"} />
                <link rel="canonical" href={metatags.href} key={"canonical"} />
                        
                {/* icon */}
                <link rel="icon" href={metatags.ico} key={"icon"} />
                <link rel="icon" href={metatags.ico} sizes="32x32" key={"icon32"} />
                <link rel="icon" href={metatags.largeIco || metatags.ico} sizes="192x192" key={"icon192"} />
                <link rel="apple-touch-icon" href={metatags.largeIco || metatags.ico} key={"apple-touch-icon"} />
                <meta name="msapplication-TileImage" content={metatags.largeIco || metatags.ico} key={"msapplication-TileImage"} />

                {/* twitter */}
                <meta name="twitter:card" content="app" key={"twitter:card"} />
                <meta name="twitter:description" content={metatags.description} key={"twitter:description"} />
                <meta name="twitter:image" content={metatags.largeIco || metatags.ico} key={"twitter:image"} />

                {/* og */}
                <meta property="og:locale" content={metatags.locale} key={"og:locale"} />
                <meta property="og:type" content="website" key={"og:type"} />
                <meta property="og:description" content={metatags.description} key={"og:description"} />
                <meta property="og:url" content={metatags.href} key={"og:url"} />
                <meta property="og:site_name" content={metatags.title} key={"og:site_name"} />
                <meta property="og:image" content={metatags.largeIco || metatags.ico} key={"og:image"} />
                <meta property="og:image:secure_url" content={metatags.largeIco || metatags.ico} key={"og:image:secure_url"} />
                <meta property="og:image:width" content="1280" key={"og:image:width"} />
                <meta property="og:image:height" content="519" key={"og:image:height"} />
            </Head>
			<Header categories={categories} />
			<Navbar data={categories} current_slug={course.slug} />
			<section className={'container vertical primary_bg'} style={{minHeight: '600px'}}>
				<SectionTitle
					title={course.title}
					textclasses={'weight_l3 font_l7 secondary_font secondary_color'}
				/>
				<section className={'subcontainer horizontal topy verticalTabletBreak'}>
					<section className={'subcontainer horizontal wrap rowgap_l3 colgap_l3 center'} id={'mainitemslist'}>
						{course.lessons.map((lesson, key) => <LessonBox
							key={key}
							data={lesson}
							customclasses={`wideonLargeTablet ${style.lessonwidth}`}
							link={`/${course.slug}/${lesson.slug}`}
						/>)}
					</section>
				</section>
			</section>
			<Footer categories={categories} />
			<Axg />
		</>
    )
}
  
export const getStaticProps = async ({params}) => {
	const categories = await fetchup()
	const article_cat = categories.filter(cat => cat.slug == 'articles')[0]

	return ({
		props: {
			course: article_cat,
            categories,
			metatags: {
                title: article_cat.metatags.title,
                description: article_cat.metatags.description,
                href: `https://homapilot.com/${article_cat.slug}`,
                ico: '/ico.png'
            }
		}
	})
}