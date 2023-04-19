import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 0 16px;
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 32px;
  margin: 16px 0;
`;

export const ListContainer = styled.div`
  background: #fff;
  padding: 16px;
  border-radius: 8px;
`;

export const LineContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;

  h2 {
    font-size: 18px;
  }

  span {
    font-size: 14px;
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 16px 0;

  button {
    border: none;
    border-radius: 4px;
    background: ${({ theme }) => theme.colors.primary.main};
    color: #fff;
    padding: 16px;

    &[disabled] {
      background: ${({ theme }) => theme.colors.gray[200]};
      cursor: default;
    }
  }

  div {
    display: flex;
    align-items: center;
    flex-direction: column;

    gap: 8px;
}
`;
