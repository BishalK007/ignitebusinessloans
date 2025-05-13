export async function POST(request) {
    const webhookUrl = 'https://hook.us2.make.com/wms5j2wiofkjirj4yqi8628fh4af96ar';

    try {
        const body = await request.json();
        const {
            in_business,
            business_type,
            loan_amount,
            fund_reason,
            annual_revenue,
            credit_score,
            industry,
            zipcode,
            business_name,
            first_name,
            last_name,
            phone,
            email
        } = body;

        console.log('Received data:', body);

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                in_business,
                business_type,
                loan_amount,
                fund_reason,
                annual_revenue,
                credit_score,
                industry,
                zipcode,
                business_name,
                first_name,
                last_name,
                phone,
                email
            })
        });

        console.log('Webhook response:', response);
        if (!response.ok) {
            return new Response(JSON.stringify({ error: `Webhook request failed: ${response.statusText}` }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const contentType = response.headers.get('content-type');
        let data;
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            data = await response.text();
        }
        return new Response(JSON.stringify({ message: 'Data sent successfully', data }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error sending data:', error);
        return new Response(JSON.stringify({ error: 'Failed to send data' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}