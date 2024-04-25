module OceanStateEstimationMITgcmExt

    import OceanStateEstimation: read_nctiles_alias, untargz_alias, read_mdsio_alias

    import MITgcm: read_nctiles, untargz, read_mdsio

    read_nctiles_alias(args...;kwargs...)=read_nctiles(args...;kwargs...)

    read_mdsio_alias(args...)=read_mdsio(args...)

    untargz_alias(fil)=untargz(fil)
    
end


