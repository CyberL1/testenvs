export interface Container {
  id: string;
  name: string;
  status: string;
}

export interface ContainerStats {
  "name": string;
  "id": string;
  "read": string;
  "preread": string;
  "pids_stats": { "current": number; "limit": number };
  "blkio_stats": {
    "io_service_bytes_recursive": [
      { "major": number; "minor": number; "op": string; "value": 0 },
      { "major": number; "minor": number; "op": string; "value": 0 },
    ];
    "io_serviced_recursive": null;
    "io_queue_recursive": null;
    "io_service_time_recursive": null;
    "io_wait_time_recursive": null;
    "io_merged_recursive": null;
    "io_time_recursive": null;
    "sectors_recursive": null;
  };
  "num_procs": number;
  "storage_stats": {};
  "cpu_stats": {
    "cpu_usage": {
      "total_usage": number;
      "usage_in_kernelmode": number;
      "usage_in_usermode": number;
    };
    "system_cpu_usage": number;
    "online_cpus": number;
    "throttling_data": {
      "periods": number;
      "throttled_periods": number;
      "throttled_time": number;
    };
  };
  "precpu_stats": {
    "cpu_usage": {
      "total_usage": number;
      "usage_in_kernelmode": number;
      "usage_in_usermode": number;
    };
    "throttling_data": {
      "periods": number;
      "throttled_periods": number;
      "throttled_time": number;
    };
  };
  "memory_stats": {
    "usage": number;
    "stats": {
      "active_anon": number;
      "active_file": number;
      "anon": number;
      "anon_thp": number;
      "file": number;
      "file_dirty": number;
      "file_mapped": number;
      "file_writeback": number;
      "inactive_anon": number;
      "inactive_file": number;
      "kernel_stack": number;
      "pgactivate": number;
      "pgdeactivate": number;
      "pgfault": number;
      "pglazyfree": number;
      "pglazyfreed": number;
      "pgmajfault": number;
      "pgrefill": number;
      "pgscan": number;
      "pgsteal": number;
      "shmem": number;
      "slab": number;
      "slab_reclaimable": number;
      "slab_unreclaimable": number;
      "sock": number;
      "thp_collapse_alloc": number;
      "thp_fault_alloc": number;
      "unevictable": number;
      "workingset_activate": number;
      "workingset_nodereclaim": number;
      "workingset_refault": number;
    };
    "limit": number;
  };
  "networks": {
    "eth0": {
      "rx_bytes": number;
      "rx_packets": number;
      "rx_errors": number;
      "rx_dropped": number;
      "tx_bytes": number;
      "tx_packets": 3;
      "tx_errors": number;
      "tx_dropped": number;
    };
    "eth1": {
      "rx_bytes": number;
      "rx_packets": number;
      "rx_errors": number;
      "rx_dropped": number;
      "tx_bytes": number;
      "tx_packets": 3;
      "tx_errors": number;
      "tx_dropped": number;
    };
  };
}
