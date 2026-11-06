#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItWriteDataDef {
    static constexpr std::uint8_t opcode = 0x37;
    static constexpr std::string_view name = "IT_WRITE_DATA";
    static constexpr std::string_view desc = "Direct payload data write into target GPU register or memory address";
};
}
