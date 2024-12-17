import BackButton from '@/components/BackButton';
import { getCustomer } from '@/lib/queries/getCustomers';
import * as Sentry from "@sentry/nextjs"

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    // TO GET CUSTOMER ID
    const { customerId } = await searchParams;

    // EDIT CUSTOMER FORM
    if (customerId) {
      const customer = await getCustomer(parseInt(customerId));

      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer Id #{customerId} not found
            </h2>
            <BackButton variant="default" title="Go Back" />
          </>
        );
      }
      console.log(customer)

      // put customer form component
    } else {
      // new customer form component
    }
  } catch (err) {
    if (err instanceof Error) {
      Sentry.captureException(err)
      throw err;
    }
  }
}
