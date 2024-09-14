    import { BrowserRouter } from 'react-router-dom';
    import RouterComponent from './Components/utils/RouteComponent'
    import React from 'react';


    const App: React.FC = () => {
        return (
            <div>
                <BrowserRouter>
                <RouterComponent/>

                </BrowserRouter>
            </div>
        );
    };

    export default App;