import { useCallback, useEffect, useMemo, useState } from "react";
import { toWei } from "../utils/helper";
import { TransactionStatus } from "../utils/interface";
import useActiveWeb3React from "./useActiveWeb3React";
import useBlockNumber from "./useBlockNumber";
import { useInoContract } from "./useContract";

export function useStakeCallback(
  poolId?: number
): [TransactionStatus, () => {}, () => {}] {
  const { library, chainId } = useActiveWeb3React();
  const inoContract = useInoContract();
  const [data, setData] = useState({ hash: "", status: "" });
  const blockNumber = useBlockNumber();

  let stakeRes: any = null;

  const purchasePackage = useCallback(
    async (stakeAmount?: string, poolId?: number) => {
      try {
        const depositTokens = toWei(stakeAmount);
        setData({ ...data, status: "waiting" });

        stakeRes = await inoContract?.deposit(poolId, depositTokens);
        setData({ ...data, hash: stakeRes?.hash, status: "pending" });
      } catch (error) {
        setData({ ...data, status: "" });

        console.log("stake trx error ", { error, poolId });
      }
    },
    [inoContract, setData]
  );

  const claimPackage = useCallback(
    async (unstakeAmount?: string, poolId?: number) => {
      const withdrawTokens = toWei(unstakeAmount);

      try {
        setData({ ...data, status: "waiting" });

        let unstakeRes: any = null;
        unstakeRes = await inoContract?.withdraw(poolId, withdrawTokens);

        setData({ ...data, hash: unstakeRes?.hash, status: "pending" });
      } catch (error) {
        setData({ ...data, status: "" });

        console.log("unstake error ", error);
      }
    },
    [inoContract, setData]
  );

  useEffect(() => {
    if (!data?.hash) {
      return;
    }

    if (data?.status === "completed" || data?.status === "failed") {
      return;
    }

    library
      ?.getTransactionReceipt(data?.hash)
      .then((res) => {
        if (res?.blockHash && res?.blockNumber) {
          setData({ ...data, status: "completed" });
        }
      })
      .catch((err) => {
        console.log("transaction failed ", err);
        setData({ ...data, status: "failed" });
      });
  }, [blockNumber]);

  const transactionStatus = useMemo(() => {
    return { status: data?.status, hash: data?.hash };
  }, [data]);

  return [transactionStatus, purchasePackage, claimPackage];
}
