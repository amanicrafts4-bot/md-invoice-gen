import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer'

type Row = {
  date: string
  no: string
  vehicle: string
  destination: string
  rate: number
}

type Props = {
  rows: Row[]
  total: number
  clientName?: string
  clientEmail?: string
  clientPhone?: string
  invoiceDate?: string
  refNumber?: string
}

export default function InvoicePDF({
  rows,
  total,
  clientName = '',
  clientEmail = '',
  clientPhone = '',
  invoiceDate = new Date().toLocaleDateString(),
  refNumber = `MD-${Date.now()}`,
}: Props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.header}>
          <Image src="/md-travels-logo.png" style={styles.logo} />

          <View style={styles.headerRight}>
            <Text>44 Wrench Street</Text>
            <Text>Parow West</Text>
            <Text>Cape Town</Text>
            <Text>7500</Text>
            <Text>Email: info@mdtravel.co.za</Text>
            <Text>24 Hours: 060 641 1703</Text>
            <Text>Alt: 071 945 5941</Text>
          </View>
        </View>

        {/* TITLE + META */}
        <View style={styles.titleRow}>
          <Text style={styles.invoiceTitle}>INVOICE</Text>

          <View style={styles.metaRight}>
            <Text>DATE: {invoiceDate}</Text>
            <Text>REF NO: {refNumber}</Text>
          </View>
        </View>

        {/* CLIENT + BANKING */}
        <View style={styles.metaSection}>
          {/* CLIENT */}
          <View style={styles.clientBox}>
            <Text style={styles.bold}>Attention:</Text>
            {clientName && <Text>{clientName}</Text>}
            {clientEmail && <Text>{clientEmail}</Text>}
            {clientPhone && <Text>{clientPhone}</Text>}

            <View style={styles.spacer} />

            <Text>1 × 14 Seater luxury Toyota Quantum</Text>
            <Text>1 × Professional driver with PDP</Text>
          </View>

          {/* BANKING */}
          <View style={styles.bankBox}>
            <Text style={styles.bold}>Banking Details</Text>
            <Text>Bank Name: DLUNGE TRANSPORT SERVICE</Text>
            <Text>Branch Name: FNB POP BRANCH</Text>
            <Text>DELOTTERY</Text>
            <Text>Swift Code: FIRNZAJJ</Text>
            <Text>Account Type: GOLD BUSINESS</Text>
            <Text>Account No: 62828522294</Text>
            <Text>Branch Code: 203209</Text>
          </View>
        </View>

        <Text style={styles.thankYou}>THANK YOU FOR YOUR BOOKING</Text>

        {/* TABLE */}
        <View style={styles.table}>
          <View style={styles.trHeader}>
            <Text style={styles.th}>DATE</Text>
            <Text style={styles.th}>NO</Text>
            <Text style={styles.th}>VEHICLE</Text>
            <Text style={styles.th}>DESTINATION</Text>
            <Text style={styles.thRight}>RATE</Text>
          </View>

          {rows.map((row, i) => (
            <View key={i} style={styles.tr}>
              <Text style={styles.td}>{row.date}</Text>
              <Text style={styles.td}>{row.no}</Text>
              <Text style={styles.td}>{row.vehicle}</Text>
              <Text style={styles.td}>{row.destination}</Text>
              <Text style={styles.tdRight}>
                R {row.rate.toFixed(2)}
              </Text>
            </View>
          ))}

          <View style={styles.totalRow}>
            <Text style={styles.vatText}>
              ALL PASSENGER TRANSPORT IS EXEMPT OF VAT
            </Text>
            <Text style={styles.totalText}>
              TOTAL&nbsp;&nbsp;R {total.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* TERMS */}
        <View style={styles.terms}>
          <Text style={styles.bold}>TERMS & CONDITIONS:</Text>
          <Text>• Bookings are confirmed once payment or deposit is received.</Text>
          <Text>• Payment is due before or on the day of travel unless agreed.</Text>
          <Text>• Cancellations within 24 hours may be charged.</Text>
          <Text>• Airport pickups include reasonable waiting time.</Text>
          <Text>• Vehicles are fully insured and professionally driven.</Text>
          <Text>• Delays beyond our control cannot be guaranteed.</Text>
          <Text>• Passenger belongings remain their responsibility.</Text>
          <Text>• Route changes or extra stops may incur extra charges.</Text>
          <Text>• Acceptance of service confirms agreement to these terms.</Text>
          <Text>• Services are governed by South African law.</Text>
        </View>

        {/* FOOTER */}
        <Text style={styles.noDrive}>NO SELF-DRIVE</Text>

        <Text style={styles.signature}>
          Malipheze Dlunge{'\n'}
          Managing Director{'\n'}
          060 641 1703
        </Text>
         <Image src="/signature.jpg" style={styles.logo} />
      </Page>
    </Document>
  )
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 9.5,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: 90,
  },
  headerRight: {
    textAlign: 'right',
  },
  titleRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  invoiceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  metaRight: {
    textAlign: 'right',
  },
  metaSection: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  clientBox: {
    width: '55%',
  },
  bankBox: {
    width: '40%',
    borderWidth: 1,
    padding: 6,
  },
  thankYou: {
    marginTop: 6,
    marginBottom: 6,
    textAlign: 'center',
    color: 'red',
  },
  table: {
    borderWidth: 1,
    marginTop: 6,
  },
  trHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    backgroundColor: '#eee',
  },
  tr: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    minHeight: 22,
  },
  th: {
    flex: 1,
    padding: 4,
    fontWeight: 'bold',
  },
  thRight: {
    flex: 1,
    padding: 4,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  td: {
    flex: 1,
    padding: 4,
  },
  tdRight: {
    flex: 1,
    padding: 4,
    textAlign: 'right',
  },
  totalRow: {
    padding: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vatText: {
    fontWeight: 'bold',
  },
  totalText: {
    fontWeight: 'bold',
  },
  terms: {
    marginTop: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  noDrive: {
    marginTop: 12,
    fontWeight: 'bold',
  },
  signature: {
    marginTop: 10,
  },
  spacer: {
    marginVertical: 6,
  },
})
