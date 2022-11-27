import React, {useEffect, useMemo} from "react";
import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from "react-router-dom";
import Example from "./components/Example";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const App = () => {

    const queryClient = useMemo(() => new QueryClient(), []);
    const router = useMemo(() => {
        return createBrowserRouter(
            createRoutesFromElements(
                <Route path="/" element={<Example/>}>
                </Route>
            )
        );
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
           <RouterProvider router={router}/>
        </QueryClientProvider>
    )
}

export default App;