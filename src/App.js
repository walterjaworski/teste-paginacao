import { useEffect, useState } from 'react';

import { ThemeProvider } from 'styled-components';

import GlobalStyles from './styles/global';
import defaultTheme from './styles/themes/default';

import * as S from './styles';

export default function App() {
  const [candidatesList, setCandidatesList] = useState([]);
  const [candidatesFilteredList, setCandidatesFilteredList] = useState([]);
  const [activePage, setActivePage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);

  function roundUpToNearestEven(number) {
    const rounded = Math.ceil(number);
    return rounded % 2 === 0 ? rounded : rounded + 1;
  }

  function getPage(pageNumber) {
    const startIndex = (pageNumber - 1) * 2;
    const endIndex = startIndex + 2;

    return setCandidatesFilteredList(candidatesList.slice(startIndex, endIndex));
  }

  function handleNextPage() {
    setActivePage((prevState) => prevState + 1);
    getPage(activePage);
  }

  function handlePrevPage() {
    setActivePage((prevState) => prevState - 1);
    getPage(activePage);
  }

  async function getCandidatesList() {
    await fetch('https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json')
      .then((response) => response.json())
      .then((texto) => {
        setCandidatesList(texto.cand);
      })
      .catch((error) => console.log('Error: ', error));
  }

  useEffect(() => {
    getCandidatesList();
    setMaxPage(roundUpToNearestEven(candidatesList.length / 2));
  }, []);

  useEffect(() => {
    getPage(activePage);
  }, [activePage]);

  console.log({ maxPage });

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />

      <S.Container>
        <S.Title>Resultado eleições 2022</S.Title>
        <S.ListContainer>
          {candidatesFilteredList.length > 0 && (
            candidatesFilteredList.map((candidato, index) => (
              <S.LineContainer
                key={candidato.n}
                style={{
                  backgroundColor: index % 2 === 0
                    ? '#eee'
                    : '#ddd'
                }}
              >
                <h2>{candidato.nm}</h2>
                <span>{candidato.vap}</span>
              </S.LineContainer>
            ))
          )}
        </S.ListContainer>
        <S.Actions>
          <button
            type="button"
            onClick={handlePrevPage}
            disabled={activePage === 0}
          >
            anterior
          </button>
          <span>
            {candidatesList.length > 0 && `${candidatesList.length} resultados`}
            {candidatesList.length === 0 && 'Nenhum candidato encontrado'}
          </span>
          <button
            type="button"
            onClick={handleNextPage}
            // disabled={activePage >= maxPage}
          >
            próximo
          </button>
        </S.Actions>
      </S.Container>

    </ThemeProvider>
  );
}
