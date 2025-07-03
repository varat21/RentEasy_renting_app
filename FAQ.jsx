import React, { useState, useEffect } from 'react';
import { Accordion, Container, Grid, Title, Alert } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch('http://localhost/rent-easy/public/faq-api.php');
        if (!response.ok) throw new Error('Failed to fetch FAQs');
        
        const result = await response.json();
        
        // Handle both response formats
        const data = Array.isArray(result) ? result : (result.data || []);
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received from API');
        }
        
        setFaqs(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchFAQs();
  }, []);

  if (error) {
    return (
      <Container size="md" py="xl">
        <Alert icon={<IconX size="1rem" />} title="Error" color="red">
          {error}
        </Alert>
      </Container>
    );
  }

  // Ensure faqs is always an array before filtering
  const activeFAQs = Array.isArray(faqs) ? faqs.filter(faq => faq.is_active) : [];

  return (
    <Container size="lg" py="xl">
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <img src="/image1.svg" alt="FAQ" style={{ width: '100%' }} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Title order={2} mb="xl">Frequently Asked Questions</Title>
          <Accordion variant="separated">
            {activeFAQs.map(faq => (
              <Accordion.Item key={faq.faqs_id} value={faq.faqs_id.toString()}>
                <Accordion.Control>{faq.question}</Accordion.Control>
                <Accordion.Panel>{faq.answer}</Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default FAQ;