import { Link } from 'react-router-dom';

function MenuItemList(props) {
	return (
		<ul>
			{
				props.items.map(x => <MenuItem key={x.text} item={x} />)
			}
		</ul>
		);
}

function MenuItem(props) {

	function url() {
		return props.item.url || "#";
	}

	function name() {
		return props.item.text;
	}

	function toggleMenu({ target }) {
		if (props.menu.children) {
			setMenuItemClasses({ ...menuItemClasses, [target.name]: (menuItemClasses[target.name] === "" ? "open" : "") });
		}
	}
	return (
		<li>
			<Link
				to={ url() }
				name={ name() }
	//			onClick={ toggleMenu }
				>{props.item.text}</Link>
			{
			props.item.children && <MenuItemList items={props.item.children} />
			}
		</li>
	);
}

export default function Menu(props) {
	
	const menuItems = [
		{
			text: "Home",
			url: '/'
		},
		{
			text: "Services",
			url: "/services/",
			children: [
				{
					text: "SaaS development",
					url: '/saas-development/'
				},
				{
					text: "Web and mobile software",
					url: '/web-and-mobile-software/'
				},
				{
					text: "Digital product consultancy",
					url: '/digital-product-consulting/'
				},
				{
					text: "Emerging technologies",
					url: '/emerging-technologies/'
				},
				{
					text: "UX design",
					url: '/ux-design/'
				}
			]
		},
		{
			text: "Work",
			url: '/case-studies/'
		},
		{
			text: "About",
			url: "/about/",
			children: [
				{
					text: "Our approach",
					url: '/our-approach/'
				},
				{
					text: "Team",
					url: '/our-team/'
				}
			]
		},
		{
			text: "Blog",
			url: '/blog/'
		},
		{
			text: "Contact",
			url: '/contact/'
		}
	];

	return (
		<MenuItemList items={menuItems} />
	);
}
