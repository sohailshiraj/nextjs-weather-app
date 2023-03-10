import { Typography, Box } from "@mui/material";

export default function DetailRow({Icon, data}) {
    return (
      <Box style={styles.detailRow}>
        <Icon />
        <Typography ml={1} variant={'subtitle1'}>{data}</Typography>
      </Box>
    );
}

const styles= {
  detailRow: {
    display: 'flex',
    flexDirection: 'row',
  }
}