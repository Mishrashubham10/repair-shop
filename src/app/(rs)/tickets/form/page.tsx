import { getCustomer } from '@/lib/queries/getCustomers';
import { getTicket } from '@/lib/queries/getTicket';
import BackButton from '@/components/BackButton';
import * as Sentry from "@sentry/nextjs"

export default async function TicketFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    const { customerId, ticketId } = await searchParams;

    if (!customerId && !ticketId) {
      return (
        <>
          <h2 className="text-2xl mb-2">
            Ticket Id or Customer Id required to lead form
          </h2>
          <BackButton variant="default" title="Go Back" />
        </>
      );
    }

    // NEW TICKET FORM
    if (customerId) {
      const customer = await getCustomer(parseInt(customerId));

      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} not found
            </h2>
            <BackButton variant="ghost" title="Go Back" />
          </>
        );
      }

      if (!customer.active) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} is not active
            </h2>
            <BackButton variant="ghost" title="Go Back" />
          </>
        );
      }

      //   return ticket form
      console.log(customer);
    }

    // EDIT TICKET FORM
    if (ticketId) {
        const ticket = await getTicket(parseInt(ticketId))

        if (!ticket) {
            return (
              <>
                <h2 className="text-2xl mb-2">
                  Ticket ID #{ticketId} not found
                </h2>
                <BackButton variant="ghost" title="Go Back" />
              </>
            );
          }

          const customer = await getCustomer(ticket.customerId);

        //   RETURN TICKET FORM
        console.log("Ticket: ", ticket)
        console.log("Customer: ", customer)
    }
  } catch (err) {
    if (err instanceof Error) {
      Sentry.captureException(err)
      throw err;
    }
  }
}