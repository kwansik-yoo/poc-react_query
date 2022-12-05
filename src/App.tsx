import React, {useEffect, useMemo} from "react";
import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route, BrowserRouter, Routes} from "react-router-dom";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
//
import Example from "./components/Example";
import SimpleToDo from "./components/SimpleToDo";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Layout from "./Layout";

const App = () => {

    const queryClient = useMemo(() => new QueryClient(), []);

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
               <Layout>
                   <Routes>
                       <Route path="/">
                           <Route path="example" element={<Example/>}/>
                           <Route path="simple-to-do" element={<SimpleToDo/>}/>
                       </Route>
                   </Routes>
               </Layout>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export default App;