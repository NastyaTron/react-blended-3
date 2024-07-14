import { Container, CountryInfo, Heading, Section } from 'components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCountry } from 'service/countryApi';

export const Country = () => {
  const { countryId } = useParams();
  const [country, setCoutry] = useState(null);
  useEffect(() => {
    async function coutryInfo() {
      const info = await fetchCountry(countryId);
      setCoutry(info);
    }

    coutryInfo();
  }, []);
  return (
    <Section>
      <Container>
        <Heading title="SearchCountry" bottom />
        {country && <CountryInfo {...country} />}
      </Container>
    </Section>
  );
};
