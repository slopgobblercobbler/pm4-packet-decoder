#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItDumpConstRamDef {
    static constexpr std::uint8_t opcode = 0x83;
    static constexpr std::string_view name = "IT_DUMP_CONST_RAM";
    static constexpr std::string_view desc = "Dump constant RAM cache contents to target memory buffer";
};
}
