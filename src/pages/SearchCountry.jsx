import { Container, Heading, Section, CountryList, Loader } from 'components';
import { SearchForm } from 'components';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchByRegion } from 'service/countryApi';

export const SearchCountry = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const region = searchParams.get('region');
    if (!region) return;

    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await fetchByRegion(region);
        setCountries(data);
      } catch (error) {
        setError(`Error! ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  const onSubmit = region => {
    setSearchParams({ region });
  };

  return (
    <Section>
      <Container>
        <SearchForm onSubmit={onSubmit} />
        {error && <Heading title={error} bottom />}
        <CountryList countries={countries} />
        {loading && <Loader />}
      </Container>
    </Section>
  );
};
