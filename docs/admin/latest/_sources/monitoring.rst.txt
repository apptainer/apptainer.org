.. _monitoring:

##################
Monitoring Support
##################

Overview
========

{Project} does not provide a native way to collect metrics of containers. `Apptheus <https://github.com/apptainer/apptheus>`__ is a small 
agent tool that helps connect {Project} to Prometheus.

This tool is designed with several main considerations:

1. Less invasion. Developing a tool that is tightly bound to {Project} will bring too much invasion to Apptainer itself. This should be avoided.
2. Cgroup stats. Preferring using existing Linux feature for metrics collection.
3. Security. Needing customized security policy to help verify whether the caller is trusted.
4. Customized push policy. Allowing administrator to freely configure the push interval when sampling container metrics.

Requirements
============

Apptheus requires root privilege. This is because Apptheus requires permissions to manipulate the cgroups when new {Project} containers are created.

Usage
=====

First, the administrator needs to enable the monitoring feature inside {Project} by editing ``apptainer.conf``.
Simply changing the value of ``allow monitoring`` to ``yes``.

.. code:: linuxconfig

    # ALLOW MONITORING: [BOOL]
    # DEFAULT: no
    # Allow to monitor the system resource usage of apptainer. To enable this option
    # additional tool, i.e. apptheus, is required.
    allow monitoring = yes

Then the administrator starts the Apptheus

.. code:: shell

    sudo apptheus --trust.path=/usr/local/libexec/apptainer/bin/starter;/usr/local/libexec/apptainer/bin/starter-suid

.. note::

    ``--trust.path`` lists trusted callers to Apptheus. In this case, they are ``starter`` or ``starter-suid`` for {Project}.

Prometheus can read the container's metrics via the local http address, by default ``localhost:9091/metrics``.

.. code:: console

    $ curl locahost:9091/metrics
    # HELP apptheus_build_info A metric with a constant '1' value labeled by version, revision, branch, goversion from which apptheus was built, and the goos and goarch for the build.
    # TYPE apptheus_build_info gauge
    apptheus_build_info{branch="",goarch="arm64",goos="linux",goversion="go1.21.1",revision="284ead0316031c8c08e2081f0468ad83bfb82e20",tags="unknown",version=""} 1
    # HELP go_gc_duration_seconds A summary of the pause duration of garbage collection cycles.
    # TYPE go_gc_duration_seconds summary
    go_gc_duration_seconds{quantile="0"} 0
    go_gc_duration_seconds{quantile="0.25"} 0
    go_gc_duration_seconds{quantile="0.5"} 0
    go_gc_duration_seconds{quantile="0.75"} 0
    go_gc_duration_seconds{quantile="1"} 0
    go_gc_duration_seconds_sum 0
    go_gc_duration_seconds_count 0
    # HELP go_goroutines Number of goroutines that currently exist.
    # TYPE go_goroutines gauge
    go_goroutines 13
    # HELP go_info Information about the Go environment.
    # TYPE go_info gauge
    go_info{version="go1.21.1"} 1
    # HELP go_memstats_alloc_bytes Number of bytes allocated and still in use.
    # TYPE go_memstats_alloc_bytes gauge
    go_memstats_alloc_bytes 577680
    # HELP go_memstats_alloc_bytes_total Total number of bytes allocated, even if freed.
    # TYPE go_memstats_alloc_bytes_total counter
    go_memstats_alloc_bytes_total 577680
    # HELP go_memstats_buck_hash_sys_bytes Number of bytes used by the profiling bucket hash table.
    # TYPE go_memstats_buck_hash_sys_bytes gauge
    go_memstats_buck_hash_sys_bytes 5134
    # HELP go_memstats_frees_total Total number of frees.
    # TYPE go_memstats_frees_total counter
    go_memstats_frees_total 0
    # HELP go_memstats_gc_sys_bytes Number of bytes used for garbage collection system metadata.
    # TYPE go_memstats_gc_sys_bytes gauge
    go_memstats_gc_sys_bytes 2.563968e+06
    # HELP go_memstats_heap_alloc_bytes Number of heap bytes allocated and still in use.
    # TYPE go_memstats_heap_alloc_bytes gauge
    go_memstats_heap_alloc_bytes 577680
    # HELP go_memstats_heap_idle_bytes Number of heap bytes waiting to be used.
    # TYPE go_memstats_heap_idle_bytes gauge
    go_memstats_heap_idle_bytes 1.55648e+06
    # HELP go_memstats_heap_inuse_bytes Number of heap bytes that are in use.
    # TYPE go_memstats_heap_inuse_bytes gauge
    go_memstats_heap_inuse_bytes 2.146304e+06
    # HELP go_memstats_heap_objects Number of allocated objects.
    # TYPE go_memstats_heap_objects gauge
    go_memstats_heap_objects 2406
    # HELP go_memstats_heap_released_bytes Number of heap bytes released to OS.
    # TYPE go_memstats_heap_released_bytes gauge
    go_memstats_heap_released_bytes 1.55648e+06
    # HELP go_memstats_heap_sys_bytes Number of heap bytes obtained from system.
    # TYPE go_memstats_heap_sys_bytes gauge
    go_memstats_heap_sys_bytes 3.702784e+06
    # HELP go_memstats_last_gc_time_seconds Number of seconds since 1970 of last garbage collection.
    # TYPE go_memstats_last_gc_time_seconds gauge
    go_memstats_last_gc_time_seconds 0
    # HELP go_memstats_lookups_total Total number of pointer lookups.
    # TYPE go_memstats_lookups_total counter
    go_memstats_lookups_total 0
    # HELP go_memstats_mallocs_total Total number of mallocs.
    # TYPE go_memstats_mallocs_total counter
    go_memstats_mallocs_total 2406
    # HELP go_memstats_mcache_inuse_bytes Number of bytes in use by mcache structures.
    # TYPE go_memstats_mcache_inuse_bytes gauge
    go_memstats_mcache_inuse_bytes 2400
    # HELP go_memstats_mcache_sys_bytes Number of bytes used for mcache structures obtained from system.
    # TYPE go_memstats_mcache_sys_bytes gauge
    go_memstats_mcache_sys_bytes 15600
    # HELP go_memstats_mspan_inuse_bytes Number of bytes in use by mspan structures.
    # TYPE go_memstats_mspan_inuse_bytes gauge
    go_memstats_mspan_inuse_bytes 45528
    # HELP go_memstats_mspan_sys_bytes Number of bytes used for mspan structures obtained from system.
    # TYPE go_memstats_mspan_sys_bytes gauge
    go_memstats_mspan_sys_bytes 48888
    # HELP go_memstats_next_gc_bytes Number of heap bytes when next garbage collection will take place.
    # TYPE go_memstats_next_gc_bytes gauge
    go_memstats_next_gc_bytes 4.194304e+06
    # HELP go_memstats_other_sys_bytes Number of bytes used for other system allocations.
    # TYPE go_memstats_other_sys_bytes gauge
    go_memstats_other_sys_bytes 617626
    # HELP go_memstats_stack_inuse_bytes Number of bytes in use by the stack allocator.
    # TYPE go_memstats_stack_inuse_bytes gauge
    go_memstats_stack_inuse_bytes 491520
    # HELP go_memstats_stack_sys_bytes Number of bytes obtained from system for stack allocator.
    # TYPE go_memstats_stack_sys_bytes gauge
    go_memstats_stack_sys_bytes 491520
    # HELP go_memstats_sys_bytes Number of bytes obtained from system.
    # TYPE go_memstats_sys_bytes gauge
    go_memstats_sys_bytes 7.44552e+06
    # HELP go_threads Number of OS threads created.
    # TYPE go_threads gauge
    go_threads 9
    # HELP process_cpu_seconds_total Total user and system CPU time spent in seconds.
    # TYPE process_cpu_seconds_total counter
    process_cpu_seconds_total 0.02
    # HELP process_max_fds Maximum number of open file descriptors.
    # TYPE process_max_fds gauge
    process_max_fds 1.048576e+06
    # HELP process_open_fds Number of open file descriptors.
    # TYPE process_open_fds gauge
    process_open_fds 13
    # HELP process_resident_memory_bytes Resident memory size in bytes.
    # TYPE process_resident_memory_bytes gauge
    process_resident_memory_bytes 1.1862016e+07
    # HELP process_start_time_seconds Start time of the process since unix epoch in seconds.
    # TYPE process_start_time_seconds gauge
    process_start_time_seconds 1.70902187483e+09
    # HELP process_virtual_memory_bytes Virtual memory size in bytes.
    # TYPE process_virtual_memory_bytes gauge
    process_virtual_memory_bytes 1.797275648e+09
    # HELP process_virtual_memory_max_bytes Maximum amount of virtual memory available in bytes.
    # TYPE process_virtual_memory_max_bytes gauge
    process_virtual_memory_max_bytes 1.8446744073709552e+19
