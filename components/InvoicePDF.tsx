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

export default function InvoicePDF({
  rows,
  total,
  invoiceDate = new Date().toLocaleDateString(),
  refNumber = `MD-${Date.now()}`,
}: {
  rows: Row[]
  total: number
  invoiceDate?: string
  refNumber?: string
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.header}>
          <Image src="/md-travels-logo.png" style={styles.logo} />

          <View style={styles.headerRight}>
            <Text>44 Wrench Street,</Text>
            <Text>Parow West</Text>
            <Text>Cape Town</Text>
            <Text>7500</Text>
            <Text>Email: info@mdtravel.co.za</Text>
            <Text>24 hours: 060 641 1703</Text>
            <Text>Alternative: 071 945 5941</Text>
          </View>
        </View>

        {/* TITLE + DATE */}
        <View style={styles.titleRow}>
          <Text style={styles.invoiceTitle}>INVOICE</Text>
          <View style={styles.dateBox}>
            <Text>DATE: {invoiceDate}</Text>
            <Text>REF NO: {refNumber}</Text>
          </View>
        </View>

        {/* META + BANKING */}
        <View style={styles.metaSection}>
          {/* LEFT */}
          <View>
            <Text>Attention:</Text>
            <Text style={styles.spacer} />
            <Text>1 × 14 Seater luxury Toyota Quantum.</Text>
            <Text>1 × Professional driver with PDP</Text>
          </View>

          {/* RIGHT — BANKING DETAILS */}
          <View style={styles.bankBox}>
            <Text style={styles.bold}>Banking details</Text>
            <Text>Bank Name: DLUNGE TRANSPORT SERVICE</Text>
            <Text>Branch Name: FNB POP BRANCH</Text>
            <Text>DELOTTERY</Text>
            <Text>Swift Code: FIRNZAJJ</Text>
            <Text>Bank Type: GOLD BUSINESS</Text>
            <Text>Bank acc no: 62828522294</Text>
            <Text>Branch code: 203209</Text>
          </View>
        </View>

        {/* THANK YOU */}
        <Text style={styles.thankYou}>THANK YOU FOR YOUR BOOKING</Text>

        {/* TABLE */}
        <View style={styles.table}>
          <View style={styles.trHeader}>
            <Text style={styles.th}>DATE</Text>
            <Text style={styles.th}>NO</Text>
            <Text style={styles.th}>VEHICLE TYPE</Text>
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
          <Text>• Payment is due before or on the day of travel unless otherwise agreed.</Text>
          <Text>• Cancellations made less than 24 hours before travel may be charged.</Text>
          <Text>• Airport pickups include a reasonable waiting time at no extra cost.</Text>
          <Text>• All vehicles are fully insured and driven by licensed drivers.</Text>
          <Text>• Delays beyond our control cannot be guaranteed.</Text>
          <Text>• Personal belongings remain the passenger’s responsibility.</Text>
          <Text>• Additional stops may incur extra charges.</Text>
          <Text>• Acceptance of service confirms agreement to these terms.</Text>
        </View>

        {/* FOOTER */}
        <Text style={styles.noDrive}>NO SELF-DRIVE</Text>

        <Text style={styles.signature}>
          Malipheze Dlunge{'\n'}
          Managing Director{'\n'}
          0606411703
        </Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  invoiceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  dateBox: {
    textAlign: 'right',
  },
  metaSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  bankBox: {
    borderWidth: 1,
    padding: 6,
    width: 230,
  },
  thankYou: {
    textAlign: 'center',
    color: 'red',
    marginBottom: 6,
  },
  table: {
    borderWidth: 1,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 6,
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
    marginVertical: 4,
  },
})
