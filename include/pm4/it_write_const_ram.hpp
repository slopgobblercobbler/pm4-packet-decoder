#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItWriteConstRamDef {
    static constexpr std::uint8_t opcode = 0x81;
    static constexpr std::string_view name = "IT_WRITE_CONST_RAM";
    static constexpr std::string_view desc = "Direct payload data write into hardware constant RAM block";
};
}
