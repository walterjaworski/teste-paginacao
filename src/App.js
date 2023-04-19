import { useEffect, useState, useMemo } from 'react';

import { ThemeProvider } from 'styled-components';

import GlobalStyles from './styles/global';
import defaultTheme from './styles/themes/default';

import * as S from './styles';

const API_URL = 'https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json';

const CANDIDATES_FOR_PAGE = 2;

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  const candidatesToShow = useMemo(
    () => candidates.slice(currentIndex, currentIndex + CANDIDATES_FOR_PAGE),
    [currentIndex, candidates]
  );

  const totalPages = useMemo(
    () => Math.floor(candidates.length / CANDIDATES_FOR_PAGE),
    [candidates]
  );

  const currentPage = useMemo(
    () => Math.floor(currentIndex / CANDIDATES_FOR_PAGE),
    [currentIndex]
  );

  function handleNextPage() {
    setCurrentIndex((prevIndex) => Math.max(prevIndex + CANDIDATES_FOR_PAGE, 0));
  }

  function handlePrevPage() {
    setCurrentIndex((prevIndex) => Math.min(prevIndex - CANDIDATES_FOR_PAGE, candidates?.length));
  }

  useEffect(() => {
    (async function getCandidatesList() {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        const { cand } = await response.json();
        setCandidates(cand);
      } catch (error) {
        console.error('API FAIL REQUEST: ', error);
      } finally {
        setLoading(false);
      }
    }());
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <S.Container>
        <S.Title>Resultado eleições 2022</S.Title>
        <S.ListContainer>
          {!loading && candidatesToShow?.map((candidato, index) => (
            <S.LineContainer
              key={candidato.n}
              style={{
                backgroundColor: index % 2 === 0 ? '#eee' : '#ddd',
              }}
            >
              <h2>{candidato.nm}</h2>
              <span>{candidato.vap}</span>
            </S.LineContainer>
          ))}

          {loading && (
            <strong>Carregando...</strong>
          )}
        </S.ListContainer>
        <S.Actions>
          <button type="button" onClick={handlePrevPage} disabled={!currentPage}>
            Anterior
          </button>

          <div>
            <span>
              {currentPage} / {totalPages}
            </span>
            <small>
              {candidates.length > 0 && `${candidates.length} resultados`}
              {candidates.length === 0 && 'Nenhum candidato encontrado'}
            </small>
          </div>

          <button type="button" onClick={handleNextPage} disabled={currentPage === totalPages}>
            Próximo
          </button>
        </S.Actions>
      </S.Container>
    </ThemeProvider>
  );
}
