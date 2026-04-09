import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import AboutPage from "@/pages/About";
import CartPage from "@/pages/Cart";
import CheckoutPage from "@/pages/Checkout";
import ContactPage from "@/pages/Contact";
import HomePage from "@/pages/Home";
import OrderConfirmedPage from "@/pages/OrderConfirmed";
import ProductPage from "@/pages/Product";
import ShopPage from "@/pages/Shop";
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Toaster } from "sonner";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const shopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shop",
  component: ShopPage,
});
const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$id",
  component: ProductPage,
});
const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: CartPage,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});
const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: CheckoutPage,
});
const orderConfirmedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/order-confirmed",
  component: OrderConfirmedPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  shopRoute,
  productRoute,
  cartRoute,
  aboutRoute,
  contactRoute,
  checkoutRoute,
  orderConfirmedRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
