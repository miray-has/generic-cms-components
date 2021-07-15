import Menu from './Menu.jsx';
import Footer from './Footer.jsx';

export default function Layout(props) {

	return (
		<React.Fragment>
			<header>
					<nav>
						<Menu />
					</nav>
			</header>

			<main className={props.pageCssClass} role="main">

				<div>
					{props.children}
				</div>

			</main>
			<Footer />

		</React.Fragment>
	);
}