import { createBrowserRouter } from "react-router-dom";

import App        from "./App";
import Home       from "./pages/Home";
import About      from "./pages/About";
import Psychiatric from "./pages/Psychiatric";
import WeightLoss from "./pages/WeightLoss";
import IVHydration from "./pages/IVHydration";
import TMS        from "./pages/TMS";
import Telehealth from "./pages/Telehealth";
import Insurance  from "./pages/Insurance";
import Financing  from "./pages/Financing";
// import Blog       from "./pages/Blog";
import Contact    from "./pages/Contact";
import LegalPrivacy from './pages/LegalPrivacy';
import LegalTerms   from './pages/LegalTerms';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true,                    element: <Home />        },
      { path: "about",                  element: <About />       },
      { path: "psychiatry",             element: <Psychiatric /> }, // was "psychiatric"
      { path: "medical-weight-loss",    element: <WeightLoss />  }, // was "weight-loss"
      { path: "iv-hydration",           element: <IVHydration /> }, // ✅ same
      { path: "tms-therapy",            element: <TMS />         }, // was "tms"
      { path: "telehealth",             element: <Telehealth />  }, // ✅ same
      { path: "insurance",              element: <Insurance />   },
      { path: "financing",              element: <Financing />   },
      // { path: "blog",                   element: <Blog />        },
     { path: "/privacy-policy", element: <LegalPrivacy /> },
{ path: "/terms-of-use",   element: <LegalTerms /> },
      { path: "contact",                element: <Contact />     },
    ],
  },
]);

export default router;