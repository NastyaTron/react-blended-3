import { Container, CountryList, Heading, Loader, Section } from 'components';
import { useEffect, useState } from 'react';
import { getCountries } from 'service/countryApi';

export const Home = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await getCountries();
        setCountries(data);
      } catch (error) {
        setError(`Error! ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Section>
      <Container>
        {error && <Heading title={error} bottom />}
        <CountryList countries={countries} />
        {loading && <Loader />}
      </Container>
    </Section>
  );
};
