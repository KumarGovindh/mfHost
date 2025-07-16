import React, { Suspense } from 'react';
const HeaderApp = React.lazy(() => import('mfHeader/App'));
const FooterApp = React.lazy(() => import('mfFooter/App'));

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh',}}>
      <div style={{ height: '50px'}}>
        <Suspense fallback="Loading . . . ">
          <HeaderApp />
        </Suspense>
      </div>
      <div style={{justifyContent: 'center', background: 'whitesmoke', display: 'flex', height: 'calc(100vh - 100px)', alignItems: 'center'}}>Content</div>
      <div style={{ height: '50px'}}>
        <Suspense fallback="Loading . . . ">
          <FooterApp />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
