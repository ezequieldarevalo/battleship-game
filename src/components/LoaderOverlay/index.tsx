import styled from 'styled-components';
import React from 'react';
import Loader from '../common/icons/Loader';

const Shade = styled.div`
  align-items: center;
  background-color: #4a4a4a40;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;

  position: absolute;
  right: 0;
  top: 0;

  z-index: 75;
`;

const StyledLoader = styled(Loader)`
  height: 5rem;
`;

interface LoaderOverlayProps {
  children: any;
  loading: boolean;
}

function LoaderOverlay({
  children, loading,
}:LoaderOverlayProps) {
  return (
    <div>
      {children}
      {loading && (
        <Shade>
          <StyledLoader />
        </Shade>
      )}
    </div>
  );
}

export default styled(LoaderOverlay)`
  display: inherit;
  position: relative;
`;
